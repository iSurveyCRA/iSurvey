# -*- coding: utf-8 -*-
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import requests
from bs4 import BeautifulSoup
 
if __name__ == "__main__":  #해당 조건문이 있는 파일에서만 실행되고, 다른 파일에 import했을 시 실행되지 않는다.
    #출력하고자 하는 차트 개수
    RANK = 10 
 
    header = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'} 
    req = requests.get('https://www.melon.com/chart/index.htm', headers = header)
    html = req.text
    parse = BeautifulSoup(html, 'html.parser')
 
    titles = parse.find_all("div", {"class": "ellipsis rank01"})
    songs = parse.find_all("div", {"class": "ellipsis rank02"})
 

    
    title = []
    song = []
 
    for t in titles:
        title.append(t.find('a').text)
 
    for s in songs:
        song.append(s.find('span', {"class": "checkEllipsis"}).text)
 
    for i in range(RANK):
        print('%3d위: %s - %s'%(i+1, title[i], song[i]))