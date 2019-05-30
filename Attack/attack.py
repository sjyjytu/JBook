#!/user/bin/python
#-*- coding:utf-8 -*-

import urllib.parse
import http.client
import json
import random
import time
import _thread


def random_num(n):
    tmp = ''
    for i in range(n):
        tmp += str(random.randint(0, 10))
    return tmp


def random_str(n):
    tmp = ''
    for i in range(n):
        tmp += random.choice('qwertyuiopasdfghjklzxcvbnm')
    return tmp


attack_num = 25
ip = "47.103.0.246"
port = "8080"
request_url = "http://"+ip+":"+port+"/api/user/signup"
thread_num = 4


def attack(num):
    i = 0
    time_1 = time.time()
    while i < num:
        try:
            i += 1
            username = random_str(6)
            password = '123'
            email = random_num(10)+'@qq.com'
            test_data =json.dumps({'username':username, 'password':password, 'email':email})
            conn = http.client.HTTPConnection(ip, port)
            header = {"Content-type": "application/json", "Accept": "*/*"}
            conn.request(method="POST", url=request_url, headers=header, body=test_data)
        except:
            continue
    time_2 = time.time()
    print(time_2-time_1)


## 多线程
# for j in range(thread_num):
#     try:
#         _thread.start_new_thread(attack, (attack_num,))
#     except:
#         print("Error: 无法启动线程")
#
#
# while 1:
#     pass

## 单线程
attack(100)










# response = conn.getresponse()
# print(response.status)
# print(response.reason)
# res = response.read()
# #print(res)
# resp = json.loads(res)
# print(resp)

