let card = document.getElementById('card')
let ctx = card.getContext("2d");
//Set up fonts
topFont = "62px Calligraffitti"
middleFont = "34px Open Sans"
bottomFont = "bold 38px Roboto"

//Load background
blank = new Image()
blank.src = "blank.png"

text = {
	top:186,
	middle: 285,
	bottom: 660
}

function drawCard(top,middle,bottom)
{
	clearCanvas()
	ctx.drawImage(blank, 0, 0)

	//Top text
	ctx.font = topFont
	mid = card.width/2 - ctx.measureText(top).width/2;
	ctx.fillText(top, mid, text.top);

	//Description
	ctx.font = middleFont
	left = 136
	right = 136
	maxWidth = card.width - left - right

	let lines = ['']
	let padding = 50

	words = middle.split(' ')

	for (i in words)
	{
		word = words[i]
		sentence = 	lines[lines.length - 1]
		//Check if this word would push us over.
		if (ctx.measureText(sentence + word).width > maxWidth)
		{
			//Nope! Move to the next line
			lines.push(word)
		}
		else
		{			
			//We're good, just add it on.
			//Add a space if needed.
			if (sentence.length > 0)
			{
				sentence = sentence + ' '
			}
			lines[lines.length - 1] = sentence + word
		}
	}
	
	for (i in lines)
	{
		ctx.fillText(lines[i],left,text.middle + padding*i)
	}

	//Bottom text
	ctx.font = bottomFont
	mid = card.width/2 - ctx.measureText(bottom).width/2;
	ctx.fillText(bottom, mid, text.bottom);
}
function clearCanvas()
{
	ctx.clearRect(0,0,card.width,card.height)
}
function update()
{
	let topText = document.getElementById('top').value;
	let middleText = document.getElementById('middle').value;
	let bottomText = document.getElementById('bottom').value;
	drawCard(topText,middleText,bottomText)
}
setInterval(update,100)