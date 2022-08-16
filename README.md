## project-assignment-class
- project description: https://www.notion.so/wecode/65e388949475423385bec18e9ceec8d1
### Quick Start
- git clone:
  ```bash
  $ git clone http://github.com/jieunkxx/project-assignment-class.git
  ```
- Install dependencies:
  ```bash
  $ npm install
  ```
- build:
  ```bash
  $ npm run build
  ```
- start the server
  ```bash
  $ npm run start
  ```
### Features
#### Credit system
- APIs
  ![image](https://user-images.githubusercontent.com/67996710/184845218-939e2f92-9646-4d5f-a4ad-25f33d38d7cb.png)

- add credits
  - require user id through req.params
  - require credit value ( value: integer) and created date (date: Date) as an object through req.body
  - if credit created on the same date exists, add up the credit value to the existing value
  - if credit does not exist on the same date, create new data row

- use credits
  - require user id through req.params
  - require credit value ( value: integer) and date (date: Date) of the day to be used as an object through req.body 
  - check if there is valid credit left. 
    - condition1: credit has not been passed 90 days since it was created
    - condition2: credit has not been used
  - if so, use them from oldest dated credit. mark as used and move to the next oldest dateavailable credit. Update credit value.
  - if not, throws a custom error.  

- get available credits
  - require user id through req.params
  - require target date (date: Date) as an object through req.body
  - check target date and created date of each credit data row
  - Returns all credit data with (target date - creatd date < 90) && (used === false)  
 
- refund credits
  - require user id through req.params
  - require credit value ( value: integer) and created date (date: Date) as an object through req.body
  - if there is no credit exist that was created at on the given created date, throws a custom error
  - if there is credit exist that was created at on the given created date, but not enough credit left, throws a custom error
  - if there is credit exist that was created at on the given created data and has enough credit left,
    - 1. update credit value if (value - current value > 0)
    - 2. delete credit data raw if (value - current value === 0)    
    <br />
#### Queue Class
- Create Queue Class using Node and Linked List
  - constructor queue with head: Node<T>, tail: Node<T>, length: number
- Methods: `enqueue()`, `dequeue()`, `pop()`, `get_length()`
  - enqueue(item)
    - insert item at the end of the queue
    - update head, tail with the number of items left
    - update length (length++)
    - Time complexity: O(1)
  - dequeue()
    - get item at the begging of the queue and remove it
    - update head, tail in accordance with the number of items left
    - if queue is empty, throw a custom error
    - update length (length--)
    - Time complexity: O(1)
  - pop(index)
    - returns item at the indexed position and removes it
    - traverse queue until indexed position returned. 
    - update head, tail in accordance with the number of items left
    - if queue is empty or item does not exist at the postion, throw a custom error
    - update length (length--)
    - return queue
    - Time complexity: O(n)    
  - get_length()
    - returns this.length
    - Time complexity: O(1)
### Unit Testing
- Run tests
  ```bash
  $npx jest
  ```
  - Unit Tests for credit system has not been implemented.
  - Unit Tests for Queue has been completed.
  
#### tech stacks
<img width="80" height="20" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img width="80"  height="20" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img width="80"  height="20" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img width="80" height="20" src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" /> <img width="80" height="20" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" /> <img width="80" height="20" src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white<img src=" />
