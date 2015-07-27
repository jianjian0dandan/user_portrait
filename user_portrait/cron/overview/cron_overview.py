# -*- coding: UTF-8 -*-
import sys
import json
import time
from elasticsearch.helpers import scan
reload(sys)
sys.path.append('../../')
from global_utils import R_RECOMMENTATION as r
from global_utils import es_user_portrait as es
from global_utils import ES_DAILY_RANK as es_cluster
from global_utils import es_user_profile
from global_utils import R_RECOMMENTATION as r_recomment
from time_utils import ts2datetime, datetime2ts

basic_field = ['user_count', 'gender_ratio', 'location_top', 'verified_ratio']
behavior_field = ['total_status', 'keywords_top', 'activity_geo', 'hashtag_top',\
                  'topic_top', 'online_pattern_top']
user_field = ['domain_top', 'domain_top_user']
compute_field = ['recomment_in_count', 'recomment_out', 'compute_count']

index_name = 'user_portrait'
index_type = 'user'

#there have to add domain user top rank
def get_domain_top_user(domain_top):
    result = {}
    domain_user = {}
    index_name = 'weibo_user'
    index_type = 'user'
    #test user list
    test_user_list = [['2300114493', '2374470543', '2635896591', '3183208410', '3051529851'], \
                      ['1907226654', '1930756447', '2234766704', '3136175144', '2359312044'], \
                      ['3164098804', '1800558761', '2345138531', '2207893564', '2776811373'], \
                      ['2316351894', '1631925842', '3211675915', '2638131477', '2257652080'], \
                      ['2862405162', '3192918572', '2029337133', '1056405943', '2340383723']]
    count = 0
    for item in domain_top:
        domain = item[0]
        #test
        user_list = test_user_list[count]
        result[domain] = []
        profile_result = es_user_profile.mget(index=index_name, doc_type=index_type, body={'ids':user_list})['docs']
        for profile in profile_result:
            uid = profile['_id']
            try:
                uname = profile['_source']['nick_name']
                photo_url = profile['_source']['photo_url']
            except:
                uname = 'unknown'
                photo_url = 'unknown'
            result[domain].append([uid, uname, photo_url])
        count += 1
    return result


def get_user_count():
    count = 0
    query_body = {
            'query':{
                'match_all':{}
                }
            }
    count = es.count(index=index_name, doc_type=index_type, body=query_body)['count']
    #print 'all user count:', count
    return count

'''
# total status
def get_total_status():
    total_count = 0
    return total_count
'''

def get_scan_results():
    result_dict = {}
    gender_result = {'1':0, '2':0}
    verified_result = {'yes':0, 'no':0}
    location_result = {}
    activity_geo_result = {}
    keywords_result = {}
    hashtag_result = {}
    topic_result = {}
    online_pattern_result = {}
    domain_result = {}
    no_gender_count = 0
    no_verified_count = 0
    no_location_count = 0
    no_activity_geo_count = 0
    no_keywords_count = 0
    no_hashtage_count = 0
    no_topic_count = 0
    no_online_pattern_count = 0
    no_domain_count = 0
    s_re = scan(es, query={'query':{'match_all':{}}, 'size':100}, index=index_name, doc_type=index_type)
    while True:
        while True:
            try:
                scan_re = s_re.next()['_source']
                # gender ratio count
                try:
                    gender_result[str(scan_re['gender'])] += 1
                except:
                    no_gender_count += 1
                # verified ratio count
                try:
                    verified_result[str(scan_re['verified'])] += 1
                except:
                    no_verified_count += 1
                # loation top
                try:
                    location = scan_re['location']
                    if len(location.split(' '))>1:
                        location = location.split(' ')[0]
                    try:
                        location_result[location] += 1
                    except:
                        location_result[location] = 1
                except:
                    no_location_count += 1
                # activity geo
                try:
                    activity_geo = scan_re['activity_geo_dict']
                    if scan_re:
                        activity_geo_dict = json.loads(activity_geo)
                        for geo in activity_geo_dict:
                            try:
                                activity_geo_result[geo] += activity_geo_dict[geo]
                            except:
                                activity_geo_result[geo] = activity_geo_dict[geo]
                except:
                    no_activity_geo_count += 1
                # keywords
                try:
                    keywords = json.loads(scan_re['keywords'])
                    if keywords:
                        for word in keywords:
                            try:
                                keywords_result[word] += keywords[word]
                            except:
                                keywords_result[word] = keywords[word]
                except:
                    no_keywords_count += 1
                # hashtag top
                try:
                    hashtag_dict = json.loads(scan_re['hashtag_dict'])
                    if hashtag_dict:
                        for tag in hashtag_dict:
                            try:
                                hashtag_result[tag] += hashtag_dict[tag]
                            except:
                                hashtag_result[tag] = hashtag_dict[tag]
                except:
                    no_hashtag_count += 1
                # topic top
                try:
                    topic = json.loads(scan_re['topic'])
                    if topic:
                        for item in topic:
                            try:
                                topic_result[item] += 1
                            except:
                                topic_result[item] = 1
                except:
                    no_topic_count += 1
                # online pattern top
                try:
                    online_pattern = json.loads(scan_re['online_pattern'])
                    if online_pattern:
                        for item in online_pattern:
                            try:
                                online_pattern_result[item] += online_pattern[item]
                            except:
                                online_pattern_result[item] = online_pattern[item]
                except:
                    no_online_pattern_count += 1
                # domain top
                try:
                    domain = scan_re['domain']
                    if domain:
                        domain_list = domain.split('_')
                        for item in domain_list:
                            try:
                                domain_result[item] += 1
                            except:
                                domain_result[item] = 1
                except:
                    no_domain_count += 1
                    
            except StopIteration:
                print 'all done'
                # gender ratio count
                count = sum(gender_result.values())
                gender_ratio = {'1':float(gender_result['1']) / count, '2':float(gender_result['2']) / count}
                #print 'gender ratio:', gender_ratio
                result_dict['gender_ratio'] = json.dumps(gender_ratio)
                # verified ratio count
                count = sum(verified_result.values())
                verified_ratio = {'yes':float(verified_result['yes']) / count, 'no':float(verified_result['no'])/count}
                #print 'verified ratio:', verified_ratio
                result_dict['verified_ratio'] = json.dumps(verified_ratio)
                # location top
                if location_result:
                    sort_location = sorted(location_result.items(), key=lambda x:x[1], reverse=True)
                    location_top = sort_location[:5]
                else:
                    location_top = {}
                #print 'location top:', location_top
                result_dict['location_top'] = json.dumps(location_top)
                # activity geo top
                if activity_geo_result:
                    sort_activity_geo = sorted(activity_geo_result.items(), key=lambda x:x[1], reverse=True)
                    activity_geo_top = sort_activity_geo[:5]
                else:
                    activity_geo_top = {}
                #print 'activity_geo_top:', activity_geo_top
                result_dict['activity_geo_top'] = json.dumps(activity_geo_top)
                # keywords top
                if keywords_result:
                    sort_keywords = sorted(keywords_result.items(), key=lambda x:x[1], reverse=True)
                    keywords_top = sort_keywords[:50]
                else:
                    keywords_top = {}
                #print 'keywords_top:', keywords_top
                result_dict['keywords_top'] = json.dumps(keywords_top)
                # hashtag top
                if hashtag_result:
                    sort_hashtag = sorted(hashtag_result.items(), key=lambda x:x[1], reverse=True)
                    hashtag_top = sort_hashtag[:50]
                else:
                    hashtag_top = {}
                #print 'hashtag top:', hashtag_top
                result_dict['hashtag_top'] = json.dumps(hashtag_top)
                # topic top
                if topic_result:
                    sort_topic = sorted(topic_result.items(), key=lambda x:x[1], reverse=True)
                    topic_top = sort_topic[:5]
                else:
                    topic_top = {}
                #print 'topic top:', topic_top
                result_dict['topic_top'] = json.dumps(topic_top)
                # online_pattern top
                if online_pattern_result:
                    sort_online_pattern = sorted(online_pattern_result.items(), key=lambda x:x[1], reverse=True)
                    online_pattern_top = sort_online_pattern[:5]
                else:
                    online_pattern_top = {}
                #print 'online pattern top:', online_pattern_top
                result_dict['online_pattern_top'] = json.dumps(online_pattern_top)
                # domain top
                if domain_result:
                    sort_domain = sorted(domain_result.items(), key=lambda x:x[1], reverse=True)
                    domain_top = sort_domain[:5]
                else:
                    domain_top = {}
                #print 'domain top:', domain_top
                result_dict['domain_top'] = json.dumps(domain_top)
                #test need to add domain top user
                result_dict['domain_top_user'] = json.dumps(get_domain_top_user(domain_top))
                return result_dict 
            except Exception, r:
                #print Exception, r
                return result_dict
    return result_dict

# origin retweeted number top 5 user and mid
def get_retweeted_top():
    top_results = []
    k = 100000
    count = 0
    now_ts = time.time()
    date = ts2datetime(now_ts-3600*24)
    index_time = ''.join(date.split('-'))
    # test
    index_time = '20130907'
    index_type = 'bci'
    query_body = {
        'query':{
            'match_all':{}
            },
        'size':k,
        'sort':[{'origin_weibo_retweeted_top_number':{'order':'desc'}}]
        }
    try:
        result = es_cluster.search(index=index_time, doc_type=index_type, body=query_body)['hits']['hits']
    except:
        return None
    #print 'result:', len(result)
    for item in result:
        if count==5:
            break
        uid = item['_id']
        try:
            exist_result = es.get(index='user_portrait', doc_type='user', id=uid)
            #print 'exist_result:', exist_result
            try:
                source = exist_result['_source']
                count += 1
                #print 'count:', count
                uname = source['uname']
                top_mid = item['_source']['origin_weibo_top_retweeted_id']
                top_retweeted_number = item['_source']['origin_weibo_retweeted_top_number']
                top_results.append([uid, uname, top_mid, top_retweeted_number])
            except:
                continue
        except:
            continue
    #print 'retweeted top user:', top_results
    return {'top_retweeted_user':json.dumps(top_results)}

# operate information: recomment in count , out count, compute count
def get_operate_information():
    result = dict()
    now_ts = time.time()
    date = ts2datetime(now_ts - 24*3600)
    delete_date = ''.join(date.split('-'))
    result['in_count'] = len(r_recomment.hkeys('recomment_'+str(date)))
    out_count_list = r_recomment.hget('recommend_delete_list', delete_date)
    if out_count_list:
        result['out_count'] = len(out_count_list)
    else:
        result['out_count'] = 0
    #result['out_count'] = len(json.loads(r_recomment.hget('recommend_delete_list', str(delete_date))))
    result['compute'] = len(r_recomment.hkeys('compute'))
    #print 'operate compute:', result
    return result


def save_result(results):
    hash_name = 'overview'
    for item in results:
        r_recomment.hset(hash_name, item, results[item])
    return True

def compute_overview():
    results = {}
    results['user_count'] = get_user_count()
    #results['total_status'] = get_total_status()
    scan_result = get_scan_results()
    results = dict(results, **scan_result)
    retweeted_top = get_retweeted_top()
    results = dict(results, **retweeted_top)
    operate_result = get_operate_information()
    results = dict(results, **operate_result)
    #print 'results:', results
    save_result(results)
    return results


if __name__=='__main__':
    compute_overview()
    #get_retweeted_top()
    #get_operate_information()
