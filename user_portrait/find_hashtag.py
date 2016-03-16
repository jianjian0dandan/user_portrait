#-*- coding:utf-8 -*-
from parameter import domain_en2ch_dict as domain
import sys
import time
import json
import os
from global_utils import es_user_profile as es_profile
from global_utils import R_SOCIAL_SENSING as r
from global_utils import es_user_portrait as es
from time_utils import ts2datetime, datetime2ts, ts2date


def find_domain():
    index_name = 'user_portrait_1222'
    task_doc_type = 'user'
    query_body = {
        "query":{
            "filtered":{
                "filter":{
                    "bool":{
                        "must":[
                            {"terms":{"domain": ['媒体','高校','法律']}}
                        ]
                    }
                }
            }
        }
    }
    search_results = es.search(index=index_name, doc_type=task_doc_type, body=query_body)['hits']['hits']
    uid = search_results[0]['_source']['uid']

def find_hashtag(uid):
    re_scan = r.hsan('hashtag_1456848000' 0)    

if __name__ == '__main__':
	find_domain()
