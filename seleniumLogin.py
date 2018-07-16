from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import re
import sys
import json
import time

# try...except syntax
# Program starts with first line after 'try:'
# and if there is any Error (IOError, ValueError, etc)
# it moves interpreter to right after 'except:' code
try:
    # url for haksa information
    base_url = 'http://hisnet.handong.edu/haksa/hakjuk/HHAK110M.php'
    
    # setup options for Chrome Driver
    options = Options() # Call Option() imported above
    # not open browser and make Chrome Driver usable for Linux
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    # call chromedriver in /usr/local/bin/, and set options
    driver = webdriver.Chrome('/usr/local/bin/chromedriver', chrome_options=options)
    time.sleep(0.5)

    # open hisnet login page
    driver.get("https://hisnet.handong.edu/login/login.php")
    time.sleep(0.5)    
    
    # type arguments given by node.js into id and password input
    driver.find_element_by_name('id').send_keys(str(sys.argv[1]))
    driver.find_element_by_name('password').send_keys(str(sys.argv[2]))

    # click login button
    driver.find_element_by_xpath('//input[@src="/2012_images/intro/btn_login.gif"]').click()

    # open haksa information page
    driver.get(base_url)
    time.sleep(0.5)

    # crawl name, grade/studentnumber, and department of user
    name = driver.find_element_by_xpath('//form[@name="form1"]/table/tbody/tr[1]/td[2]')
    grade_stu_id = driver.find_element_by_xpath('//form[@name="form1"]/table/tbody/tr[2]/td[2]')
    department = driver.find_element_by_xpath('//form[@name="form1"]/table/tbody/tr[6]/td[2]')
    
    # split grade and student number with regular expression
    pattern_grade = re.compile(r"^[0-9]")
    pattern_stu_id = re.compile(r"[0-9]{8}$")

    # save each values
    user_name = name.text
    user_grade = pattern_grade.search(grade_stu_id.text).group()
    user_stu_id = pattern_stu_id.search(grade_stu_id.text).group()
    user_department = department.text

    # save all values in dictionary
    userInfo = {
        "username" : str(sys.argv[1]),
	"password" : str(sys.argv[2]),
        "name" : user_name,
        "grade" : user_grade,
        "student_id" : user_stu_id,
        "user_department" : user_department
    }
    
    # convert dictionary into JSON
    json_data = json.dumps(userInfo)

    # close Chrome Driver
    driver.quit()

    # print out JSON data as standard output to send data to node.js
    print(json_data)

except:
    driver.quit()  # close Chrome Driver
    error = {"error": "true"} # make error dictionary
    json_data = json.dumps(error) # convert dictionary into JSON
    print(json_data) # send JSON
