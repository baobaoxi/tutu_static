/* 
 * BlackTech 基础框架
 */

var BTF = {
    //---------------------------
    // ajax的处理
    //---------------------------
    get : function(res,param,success,error){
        this.ajax("GET",res,param,success,error);
    },
    post : function(res,param,success,error){
        this.ajax("POST",res,param,success,error);
    },
    ajax : function(method,res,param,success,error){
        var url = "/xhr/" + res + "/";
        $.ajax({  
            url:url,  
            dataType:'jsonp',  
            data: param,
            type: method,
            jsonp:'callback',  
            success:function(data) {  
                if(!data){return false;}
                if(data.error_no > 0){
                    error(data.error_no,data.error_msg);
                    return false;
                }
                success(data.data);
            },  
            timeout:3000  
        });  

    }

        
        
        
};


