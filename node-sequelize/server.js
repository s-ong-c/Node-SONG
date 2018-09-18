var fs = require('fs'),
	express = require('express'),
	bodyParser = require('body-parser'),
	db = require('./db_init.js'),
	app = express();

/*
	TODO: 이 부분을 완성해 주세요..!
*/
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.get('/api/fetchProblem', (req, res) => {
		db.Problem.findAll({}).then(problems => {
			res.json({
	      problems: problems.map(p => {
	        return {
						//'SELECT id, problem_text, type, choices FROM problems'
	          id: p.id,
	          problem_text: p.problem_text,
	          type: p.type,
	          choices: p.choices};
	      })
	    });
	  });
	});


app.post('/api/submit', (req, res) => {
	const FORM_URLENCODED = 'application/x-www-form-urlencoded; charset=UTF-8';
	console.log(req.headers['content-type']);
	console.log(FORM_URLENCODED);
if(req.headers['content-type'] === FORM_URLENCODED) {
	var input = JSON.parse(req.body.input), results;

	console.log('input',input);

   //findAll
	  db.Problem.findAll({}).then(problems => {
	    results = problems.map((p, no)=> {
	      return {
	        id: p.id,
	        result: input[no].answer === p.answer,
	        answer: p.answer
	      };
	    });
			// 결과값

			db.Result.bulkCreate(
				results.map(a => {
					return {
						// 0 오답 , 1 정답
						problem_id: a.id,
						result: a.result ? 1 : 0,
						answer: a.answer
					};
				})
			).then(()=> {
				res.json({
					results: results
				});
			});
		});
	}
});

var server = app.listen(8080, () =>  {
		console.log('Server started!!!!!!!!!');
	});
