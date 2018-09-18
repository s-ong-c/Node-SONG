var Sequelize = require('sequelize'),
	sequelize = new Sequelize('sqlite://localhost/:memory:');

var Problem = sequelize.define('problems', {
		problem_text: {
			type: Sequelize.STRING
		},
		type: {
			type: Sequelize.INTEGER
		},
		choices: {
			type: Sequelize.STRING
		},
		answer: {
			type: Sequelize.STRING
		}
	}, {
		paranoid: true
	});

var Result = sequelize.define('results', {
		problem_id: {
			type: Sequelize.INTEGER
		},
		answer: {
			type: Sequelize.STRING
		},
		result: {
			type: Sequelize.INTEGER
		}
	}, {
		paranoid: true
	});

Problem.sync({force: true}).then(function() {
	Problem.bulkCreate(data_to_insert);
});

Result.sync({force: true});

var data_to_insert = [
		{
			problem_text: '135 + 267 = ?',
			type: 1,
			choices: JSON.stringify([382, 392, 402, 412, 422]),
			answer: '3'
		},
		{
			problem_text: '다음 근사값에서 0이 유효숫자인지 확실하지 않은 것은?',
			type: 1,
			choices: JSON.stringify([0.05, 5.05, 5.50, 50, 505]),
			answer: '4'
		},
		{
			problem_text: '2개의 정수가 있다. 큰 수를 작은 수로 나누면 몫이 3이고 나머지가 3이다. 또, 작은 수에 35를 더한 수를 큰 수로 나누었더니 몫이 2이고 나머지가 4이었다. 큰 수를 구하면?',
			type: 1,
			choices: JSON.stringify([12, 14, 16, 18, 20]),
			answer: '4'
		},
		{
			problem_text: '거리가 9km인  A, B 두 지점 사이에 P점이 있다. A에서 P를 거쳐 B까지 가는 데 A에서 P까지는 시속 3km , P에서 B까지는 시속 4km 로 걸어서 2시간 30분이 걸렸다면 A에서 P까지의 거리는 몇 km?',
			type: 1,
			choices: JSON.stringify([3, 4, 5, 6, 7]),
			answer: '1'
		},
		{
			problem_text: '일차방정식 2x-3y+a=0의 한 해가 (-1, 3)일 때, a의 값은?',
			type: 1,
			choices: JSON.stringify([-11, 11, -7, 7, 5]),
			answer: '2'
		},
		{
			problem_text: '자연수 x, y 가 있다. 이 두 수의 합은 21이고, x의 2배를 3으로 나눈 값은 y에서 1을 뺀 값과 같다고 한다. 이 때, x의 값을 구하시오.',
			type: 1,
			choices: JSON.stringify([10, 11, 12, 13, 14]),
			answer: '3'
		},

		{
			problem_text: '상점에 물건을 사러 가는데 갈때는 분속 80m, 올 때는 분속 60m로 걸어서 50분 이내로 돌아오려면 집에서 상점까지의 거리가 몇 m 이내에 있어야 하는가? (단, 물건 사는데 8분 걸린다.)',
			type: 1,
			choices: JSON.stringify([274, 850, 1100, 1440, 1560]),
			answer: '4'
		},
		{
			problem_text: '철수는 3회의 수학 시험에서 각각 82점, 91점, 95점을 받았다. 다음 시험에서 몇 점 이상을 받아야 4회에 걸친 평균 성적이 90점 이상이 되겠는가?',
			type: 1,
			choices: JSON.stringify([91, 92, 93, 94, 95]),
			answer: '2'
		},
		{
			problem_text: '어떤 정수가 있다. 그 정수에서 2를 뺀 수는 그 정수의 1/2배와 1/3배의 합보다 작다고 한다. 이러한 정수 중에서 가장 큰 수는?',
			type: 1,
			choices: JSON.stringify([10, 11, 12, 13, 14]),
			answer: '2'
		},
		{
			problem_text: ' 3%의 소금물 400g 이 있다. 이것에서 몇 의 물을 증발시키면 5%의 소금물이 되겠는가?',
			type: 1,
			choices: JSON.stringify([130, 140, 150, 160, 170]),
			answer: '4'
		},
		{
			problem_text: '어떤 자동차가 9시에서 10시 사이에 경부고속도로 서울톨게이트를 출발하였다. 평균속도 88km/h인 이 자동차가 28km를 달리는 순간에 시계의 분침이 시침과 겹쳤다고 한다. 분침이 시침과 겹치는 시각을 분 단위로 반올림하여 구하여라.',
			type: 2,
			answer: '9시 49분'
		},
		{
			problem_text: '일차함수 y = ax+b 의 그래프에서 y의 값의 증가량이 x의 값의 증가량의 3배이고, x절편이 1일 때, a-b 의 값을 구하시오.',
			type: 2,
			answer: '6'
		},
		{
			problem_text: '직육면체의 물통에 수돗물을 채우고 있다. 오후 1시에 물이 이미 바닥에서 몇 cm높이로 차 있었다. 10분 후에 물의 높이가 바닥에서부터 25cm 가 되었고 25분 후에는 바닥에서부터 55cm 까지 찼다. 수돗물이 일정하게 나온다고 한다면 물의 높이가 75cm 가 되는 것은 몇 분 후인가?',
			type: 2,
			answer: '35분 후'
		},
		{
			problem_text: '점 (3, -5)를 지나고 x축에 평행한 직선을 그리시오.',
			type: 3,
			answer: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAYAAACPgGwlAAAFFUlEQVR4Xu2d23LkMAhEk///6E1NbTzr8loehGguovMaS0AfWsjOQ76/+NNOge92FbPgL0Jv2ASETugNFWhYMp1O6A0VaFgynU7oDRVoWDKdTugNFWhYMp1O6A0VaFgynU7oMAX+3OzMhoPJ/bwxWvgD9jXOtQnQeQTJmzMsSuwR7JEKr+dRueRUPjAra6HPDp7de7ZRAmWrHXoWzFO1FtDoeId+soBuAftaKuED4a9AR8AGlsqtDwW00L2cWLWxUr+izkL3gl31uB9dZFM1rxT6yq3c4lyNjv+pBml+KeDPQJc++0mgld9HnTTWby2hdUhApujOX9UPsUJFO3WAVhvtuhXDvNdKoUueM0mo0Car4FbXq6WSwMziqkyXOytgIdpWhv5qggjRrIBH5S/6I0eEsNKjyxKAJKZ1POmtX5Kb+JnqTj8K9WpMVBzUvreNsBP0V4GSesSOMLilS2NZnyCPcSUiuXahVKXBc4hcvYAgct/a6edj3tLxXsCPS51l7kP/7OZ0S/HcnHcZIxImSweiJEBE8UtFLb7Khdyofwt2iU3o/7dXhiaH5rArdO0xDxV74viC5rEzdM0XL6jYE9C1TSsKQeh/ZfK8pYvAnGa8hNHMnqKPGZm6f6q4CZhZa4TkJekiSOBZegvPS/KXPLOQgnopJK8O0CWzHSKuGvW/hZC8CD3vPJc0q6qvOkEffeKEuElFw+mbQRfoTzd0Qr/p0MyizBrqrpbM9UFy6+T00YyECDvbjYPnId8PJNBhFwojYWa2qeZ0iPbdoUOcNNOFgmfNT6Lu0AWahz9C6OEI/BMIgw6ZLf76lYwYCp3gY3qG0GN03yuq9CJ3VG3edXvJCanGXPNZ6DziIVyHm0JeKbXQR3+88JVk/2jmLl8BB0lmf4bTFUJ01jidR/w0O/UCQldLV3MhZJ6vHu8r62ti8MsaBnwVGuTo8dM1dSSottqZzrmO6xmoyy2cvroHTrq6O0NdbgEMnmBddqrM4S4ndBUX6CIXE63M9GOuWzQPVMkim7u43BKWS4cWgadJ01W/VacfBbomrVE1+RpX/Qg9RzeUhX7IZ9VIOXBgs3Cb4+cyrAG5diyWh8vuIXoRugvb2yAhLre8vZ8vdIh949DgIoe4HAUnrINxfMx3DtXI+njnK5ysP8JcjnL68aUO1VAyWfM+FepyJHSCv2+6UId7vVOnKDKJ6cMdTuj+nZDGAB5zN02H+3N+R0ylgQd0zveY/yo17HFP6OiLY6CRh6FTOdxrpl/VSDPXnDokZb1eTr9+pt3d9SkdHuV0J4OFh0np8GjoqZ2w0DIl6vI+3ned8YezUzs82unXGR/dfAvmTvtfIcJf2Z5ELXEkDgoo4exr7lkcVlG8ss2aCXql17iKTfo2fBbox6fa7OAPd2fP8/GOkgl6hW/0pR2e5fZ+15EZZ2XGnNRvHNmcnvFVbgt3nzskK/QM8LeY33fHQXboURe8rY7zrO/pn+aTJwTPWJ/qhvy+gtM9j/rtgVd810TNWdS+EKeublrJ6edarR253Q39qTGqQre84Fk30KoR4esrQz/Pem0d7YBXnOkjF2jgadbAXegRQOsQj9w0MaSzuS3wnZw++1onbQ5N46Vfs5vTJXO+tct3dPrV8TvXqD5RdnU64T+0xO7Q1W7YeSGh70x3UBuhE3pDBRqWTKcTekMFGpZMpxN6QwUalkynE3pDBRqWTKcTekMFGpZMpxN6QwUalvwDm9v3ftpUXEUAAAAASUVORK5CYII='
		},
		{
			problem_text: '두 직선 2x+y+3=0, x-2y+4=0 의 교점과 점 (2, -1)을 지나는 직선을 그리시오.',
			type: 3,
			answer: 'data:image/pn;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAYAAACPgGwlAAAFP0lEQVR4Xu2d4ZLbIAyEc+//0O2kPa7EtY0Eu0KWdH86bQBL+2kFOJ3261U/6RT4SpdxJfwq6AmLoKAX9IQKJEy5nF7QEyqQMOVyekFPqEDClMvpBT2hAglTzuz0X69XzpdTWaG/gbefdBqkS/ibdHN5Srdnh/6ugXTgM0I/g5wKfDboV3BT7fEF/fPKlsLxBf1/6O8/Ca1L6OQm37u0Vh9Wm7CJnQDXtG7N2Mna2jctE3SNygVdo5bTsTMte2aO0/Q/w8ri9NDO1VZaQb9XLGSxZIAeEpzW3f34gl5OX6kfl3NXXb4636Uo0Z2OgIZYwxX8gj7GEe7qVtDH0MN95x4Zeri2LKvP8aiCPtaonC7TaPuocvkNgqhOZ0APc6Ar6LqmxCgmXQSA0RGhM8Ew1wbglC0REbos87lRBX1ON+osi3338eCjOd0CiMUzqM6IBp0qVrf4o8EX9LkyKehzuj1+1mPBl9PXau+R4KNA3yW+xW3hqizbs9vnYpbigWuGoM/eBb19GfP+9U7LI6AzQd7zJeP6ue2ZqvwjQN/ptgZAAoultTp/ViB0a0e5PgGEUrl81JIA8ZgsoU7aJCqbh0zlbu30URvs96hZ2axzmo0TMc8NdClYRNLHNaZEYARisKZ6L1cf84VJTAciXD8zZFju6FaYyWmTdQqZtqTz06EvJQ+R/4GLoKG3lxWMdR8oLzxkyPbJgAMJDC5XjAUhnY0BPYa8/rKAAI/ycsYfHnxEMOBM6NXiseAfAb2lDA0Wq+NjVoNryN7T4QE/BhUmUErHtIDO3EYw0vpdhWIaNvR2by/w+sKiuNwSBKVi9To+ZgZVLwun16FOX2thoNcrWjn8cNAttxW5zH5GUoHvEp+elB9+U5HQ9bHc03sF6IlNyb1/Eu3E3qdW0PeDNjfDLuh1qPsstv7vFdKZ0B8wMFK1+b8CmergAfquA6WXxm6yj3vY04+Cm1a6F9rWDm9573Z65rd15g73CD1Tm98G3JvIW4UwbvlbtzMv7d38rmoM+ZjfVsN5hb5VFGJBbHW4tz09w2neBXCvboq4t7vKyVt7dyUOsM27cblHp7sSBwDdZT6enB7R5QX9xjnRgLvOZ7fTTb9SBLRr6RIF/UIp18JI6Q66125TnYa3MyiX+x0Adv8lksfD8u0/bQnM/7+lorvcNfhdTo/uctdvGAs6s5/9W9tVZ9sBPZvL3X2DaA3dVcV/0+ivjeyDl4uC3wHd+pmaBu4CiibgmbHWADyJehWLxQsji2dc1oMldE/ApQZhx7xlu8sIXeMyzVhpIZ1d59hniY9nWkFnO0Yq+KyzWvysPCyK60ejTNBngR+vXO33DO1M4DMC9/g2Cu1Q9HqmmkWHjnD33dbBavtUx7Ohsx1xBYQq2slDWXlSijYadGvYZ/s9WlM4eHSAu94zw4WRXgcuXI++gkHzY0FntburOy5a5AXmP1OhoLr/knOZ2fICF+pYQLd4hjf4kJwZ0CGB3RQT856MgDw67a90JYi2aOiQoA6qMdZkwx2tv3rgXNLEG/SjGEvJjZR38nm/92vynT4zIKFrAj7TezoJJ/AQYWg11I7/E+Nu6L2z0fEgIOxao3/TN9JFbRYUdGnFFeS5MhrpO/r846ls6EfIo6qdkyTHrLvDn+pgyIKuCiIHM2iWVy1d5HgE9DM3l6OhjC8XO7vtDLVHQ0esZyNXvKeIz0urkNQnx3hau8pItK2uQneVcQUjU6Cgy3QKNaqgh8IpS6agy3QKNaqgh8IpS6agy3QKNaqgh8IpS6agy3QKNeo3aPz7fnWAE/wAAAAASUVORK5CYII='
		},
	];

module.exports = {
	sequelize: sequelize,
	Problem: Problem,
	Result: Result
};
