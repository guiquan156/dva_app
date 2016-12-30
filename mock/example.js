'use strict';
const mock = {
	total: 12,
	current: 1,
	loading: false,
	list: [
		{
			id: 1,
			name: '张三1',
			age: 23,
			address: 'haha'
		},
		{
			id: 2,
			name: '李四2',
			age: 1123,
			address: '嘿嘿嘿'
		},
		{
			id: 3,
			name: '网舞3',
			age: 23,
			address: '超超超超'
		},
		{
			id: 4,
			name: '张三4',
			age: 23,
			address: 'haha'
		},
		{
			id: 5,
			name: '李四5',
			age: 1123,
			address: '嘿嘿嘿'
		},
		{
			id: 6,
			name: '网舞6',
			age: 23,
			address: '超超超超'
		},
		{
			id: 7,
			name: '张三7',
			age: 23,
			address: 'haha'
		},
		{
			id: 8,
			name: '李四8',
			age: 1123,
			address: '嘿嘿嘿'
		},
		{
			id: 9,
			name: '网舞9',
			age: 23,
			address: '超超超超'
		},
		{
			id: 10,
			name: '张三10',
			age: 23,
			address: 'haha'
		},
		{
			id: 11,
			name: '李四11',
			age: 1123,
			address: '嘿嘿嘿'
		},
		{
			id: 12,
			name: '网舞12',
			age: 23,
			address: '超超超超'
		},
	]
}
module.exports = {

  'GET /api/example': function (req, res) {
    setTimeout(function () {
      res.json({
        success: true,
        data: ['foo', 'bar'],
      });
    }, 500);
  },

  //user接口
  'GET /api/users': function (req, res) {
  	if(req.query.a == 'getUserList') {
  		setTimeout(function () {
	      res.json({
	        code: 200,
	        result: mock,
	      });
	    }, 500);
  	}else if(req.query.a == 'delUser') {
  		const id = req.query.id;


  		// mock.list = mock.list.map()

  		for(var k in mock.list){
  			if(mock.list[k].id == id){
  				mock.list.splice(k, 1);
  			}
  		}


  		console.log(mock);

  		setTimeout(function () {
	      res.json({
	        code: 200,
	        result: mock,
	      });
	    }, 500);
  	}
  }

};
