let card = document.getElementById('card')
let ctx = card.getContext("2d");

let object = document.getElementById('objectionexample')
let octx = object.getContext('2d')
//Set up fonts
topFont = "62px Calligraffitti"
middleFont = "34px Open Sans"
bottomFont = "bold 38px Roboto"
objectionFont = "Bangers"

//Background vars
let barSize = 46

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
objectionFrame = 0
function update()
{
	let topText = document.getElementById('top').value;
	let middleText = document.getElementById('middle').value;
	let bottomText = document.getElementById('bottom').value;
	drawCard(topText,middleText,bottomText)

	updateObjection()
}
let objectionImage = new Image();
function updateImage()
{
	let file = document.getElementById('chooseImage').files[0]
	if (file)
	{		
		objectionImage.file = file;
		
		const reader = new FileReader();
	    reader.onload = function(e) { 
	    	objectionImage.src = e.target.result; 

	    	objectionImage.onload = function(){
		    	console.log(objectionImage.width)
				if (objectionImage.width > 200){
					document.getElementById('objectionOffsetX').setAttribute('max', objectionImage.width)
				}
				else
				{

				}
				if (objectionImage.height > 200)
				{
					document.getElementById('objectionOffsetY').setAttribute('max', objectionImage.height)
				}
				else
				{

				}
			}
	    }; 

    	reader.readAsDataURL(file);
	}
}
function updateObjection()
{

	//Background
	objectionFrame++
	objectionFrame = objectionFrame >= splash.length ? 0 : objectionFrame; //Wrap around to 0

	octx.clearRect(0,0,object.width,object.height)
	octx.drawImage(splash[objectionFrame],0,0)

	//Image
	
	let xoffset = parseInt(document.getElementById('objectionOffsetX').value)
	let yoffset = parseInt(document.getElementById('objectionOffsetY').value)
	let zoffset = parseInt(document.getElementById('objectionOffsetZ').value)

	let zoom = zoffset / 10

	let midx = object.width /2 - (objectionImage.width * zoom) /2 
	let midy = object.height /2 - (objectionImage.height * zoom) /2 

	octx.drawImage(objectionImage, midx +xoffset, midy +yoffset, objectionImage.width * zoom, objectionImage.height * zoom)

	//Draw bars
	octx.fillStyle = "black"
	octx.fillRect(0,0,object.width,barSize)
	octx.fillRect(0,object.height - barSize,object.width,barSize)

	objectoffset = 35

	textTopOffset = parseInt(document.getElementById('topSlider').value)
	textBottomOffset = parseInt(document.getElementById('bottomSlider').value)

	//Draw text
	let text = document.getElementById('objectiontop').value
	octx.font = "32px Bangers"
	octx.fillStyle = "white"
	mid = object.width/2 - octx.measureText(text).width/2
	octx.fillText(text,mid + textTopOffset, objectoffset)

	//Draw text
	text = document.getElementById('objectionbottom').value
	octx.font = "32px Bangers"
	octx.fillStyle = "white"
	mid = object.width/2 - octx.measureText(text).width/2
	octx.fillText(text,mid + textBottomOffset, object.height - objectoffset / 4)
}
setInterval(update,100)