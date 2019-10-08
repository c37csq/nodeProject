/**增删改查的方法
 * 
 */
var fs = require('fs')
 /**获取所有学生列表 */
exports.find = function (callback) {
  fs.readFile('./database/data.json','utf-8',function(err,data){
      if(err){
          callback(err)
          return;
      }
      callback(null,JSON.parse(data).students)
  })
}

exports.findById = function (id,callback){
    fs.readFile('./database/data.json','utf-8',function(err,data){
        if(err){
            callback(err)
            return;
        }
        var students = JSON.parse(data).students
        var ret = students.find(function (item){
            return item.id === parseInt(id)
        })
        callback(null,ret)
    })
}


/**添加学生 */
exports.save = function (student,callback) {
    fs.readFile('./database/data.json','utf-8',function(err,data){
        if(err){
            callback(err)
            return;
        }
        var students = JSON.parse(data).students
        //处理id问题
        student.id = students[students.length - 1].id + 1;
        //把用户传递的数据保存到数组中
        students.push(student)
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile('./database/data.json',fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}


/**更新学生 */

exports.update = function (student,callback) {
    fs.readFile('./database/data.json','utf-8',function(err,data){
        if(err){
            callback(err)
            return;
        }
        var students = JSON.parse(data).students
        student.id = parseInt(student.id)
        var stu = students.find(function(item){
            return item.id === student.id
        })
        for(var key in student){
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile('./database/data.json',fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}



/**删除学生 */
exports.delete = function (id,callback) {
    fs.readFile('./database/data.json','utf-8',function(err,data){
        if(err){
            callback(err)
            return;
        }
        var students = JSON.parse(data).students
        var deleteId = students.findIndex(function (item){
            return item.id === parseInt(id)
        })
        students.splice(deleteId,1)
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile('./database/data.json',fileData,function(err){
            if(err){
                return callback(err)
            }
            callback(null)
        })
    })
}