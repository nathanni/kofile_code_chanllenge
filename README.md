# kofile_code_chanllenge


1.  Steps to run API
    1.  $ cd app
    2.  $ npm install
    3.  $ node server.js
    
    Enable line 7 ~ 14 in orderService.js and run orderService.js to do a simply test
    
    
    
2. API Usage
    1.  Get all fees Info <br />
        http://localhost:3000/api/fees<br />
        
    2.  Get all distributions info<br />
        http://localhost:3000/api/distributions<br /><br />
        
    3.  Get fees of specific order <br />
        http://localhost:3000/api/fees/id<br />
        example: (http://localhost:3000/api/fees/20150118000001)<br />
        
        Get fees of specific orders array (use ',' as the separator)<br />
        http://localhost:3000/api/fees/id <br />
        example: (http://localhost:3000/api/fees/20150111000001,20150123000001)<br />
        
    4.  Get distributions of specific order <br />
        http://localhost:3000/api/distributions/id<br />
        example: (http://localhost:3000/api/distributions/20150118000001)<br />
        
        Get distributions of specific orders array (use ',' as the separator)<br />
        http://localhost:3000/api/distributions/id <br />
        example: (http://localhost:3000/api/distributions/20150111000001,20150123000001)<br />
        
        
    
 3. Optimization:
    1.  Cache the data when the server start, so there is no need to re-scan the files repeatedly.
    2.  Use Promise instead of Callback
