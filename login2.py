from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import re
import sys
import json

try:

    base_url = 'http://hisnet.handong.edu/haksa/hakjuk/HHAK110M.php'
    
    options = Options()
    options.set_headless(headless=True)
    chrome_prefs = {"profile.managed_default_content_settings.images":2}
    options.add_experimental_option("prefs",chrome_prefs)

    driver = webdriver.Chrome(chrome_options=options, executable_path='./Crawling/chromedriver')
    driver.get("https://hisnet.handong.edu/login/login.php")

    driver.find_element_by_name('id').send_keys(str(sys.argv[1]))
    driver.find_element_by_name('password').send_keys(str(sys.argv[2]))

    driver.find_element_by_xpath('//input[@src="/2012_images/intro/btn_login.gif"]').click()

    driver.get(base_url)

    name = driver.find_element_by_xpath('//form[@name="form1"]/table/tbody/tr[1]/td[2]')
    grade_stu_id = driver.find_element_by_xpath('//form[@name="form1"]/table/tbody/tr[2]/td[2]')
    department = driver.find_element_by_xpath('//form[@name="form1"]/table/tbody/tr[6]/td[2]')

    pattern_grade = re.compile(r"^[0-9]")
    pattern_stu_id = re.compile(r"[0-9]{8}$")

    user_name = name.text
    user_grade = pattern_grade.search(grade_stu_id.text).group()
    user_stu_id = pattern_stu_id.search(grade_stu_id.text).group()
    user_department = department.text

    userInfo = {
        "username" : str(sys.argv[1]),
        "name" : user_name,
        "grade" : user_grade,
        "student_id" : user_stu_id,
        "user_department" : user_department
    }

    json_data = json.dumps(userInfo)

    driver.quit()

    print(json_data)

except:
    driver.quit()
    error = {"error": "true"}
    json_data = json.dumps(error)
    print(json_data)