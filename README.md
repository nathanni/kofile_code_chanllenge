# kofile_code_chanllenge


1.  Steps to run API
    1.  $ cd app
    2.  $ npm install
    3.  $ node server.js
    
    
    
2. API Usage
    1.  Get all fees Info
        http://localhost:3000/api/fees
        
    2.  Get all distributions info
        http://localhost:3000/api/distributions
        
    3.  Get fees of specific order 
        http://localhost:3000/api/fees/id
        example: (http://localhost:3000/api/fees/20150118000001)
        
        Get fees of specific order arrays (use ',' as the separator)
        http://localhost:3000/api/fees/id 
        example: (http://localhost:3000/api/fees/20150111000001,20150123000001)
        
    4.  Get distributions of specific order 
        http://localhost:3000/api/distributions/id
        example: (http://localhost:3000/api/distributions/20150118000001)
        
        Get distributions of specific order arrays (use ',' as the separator)
        http://localhost:3000/api/distributions/id 
        example: (http://localhost:3000/api/distributions/20150111000001,20150123000001)
        
        
       