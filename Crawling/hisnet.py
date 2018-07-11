from selenium import webdriver
from bs4 import BeautifulSoup
import re

driver = webdriver.Chrome('./chromedriver')

driver.get('https://hisnet.handong.edu/login/login.php')

driver.find_element_by_name('id').send_keys('jw971003')
driver.find_element_by_name('password').send_keys('************')
driver.find_element_by_xpath('//*[@id="loginBoxBg"]/table[2]/tbody/tr/td[5]/form/table/tbody/tr[3]/td/table/tbody/tr/td[2]/input').click()
driver.implicitly_wait(3)
driver.get("http://hisnet.handong.edu/for_student/haksa_info/01.php")

stuName = driver.find_element_by_xpath('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[1]/td[2]').text
stuNumAndYear = driver.find_element_by_xpath('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[2]/td[2]').text
faculty = driver.find_element_by_xpath('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[6]/td[2]').text
phoneNum = driver.find_element_by_xpath('/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td[3]/table/tbody/tr[3]/td/form/table/tbody/tr[5]/td[4]/input').get_attribute('value')


p = re.compile(r'2+\d{7}') 
stuNum = p.search(stuNumAndYear).group() 


print(stuName)
print(stuNum)
print(faculty)
print(phoneNum)
