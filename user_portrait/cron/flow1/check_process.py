# -*- coding:utf-8 -*-

import subprocess
import sys
import os
import time

def check(p_name):
    cmd = 'ps -ef|grep %s|grep -v "grep"' % p_name
    p = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    if p.wait() == 0:
        val = p.stdout.read()
        print val
        if p_name in val:
            print "ok - %s python process is running" % p_name
    else:
        print "no process is running!"
        #os.system("python ./%s &" % p_name)


if __name__ == '__main__':

    # test procedure running
    # 8-24: zmq_vent_weibo.py
    # 8-4: zmq_work_weibo.py
    # 4-8: redis_to_es.py
    d_name = ['redis_to_es.py','zmq_vent_weibo.py', 'zmq_work_weibo.py']
    for item in d_name:
        check(item)

