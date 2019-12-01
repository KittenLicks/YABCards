let edit = document.getElementById('editcanvas')
let ectx = edit.getContext('2d')

splash = []

function loadSplash()
{
	for (let i=0;i<17;i++)
	{
		let file = "images/"+(i+1)+".png"
		splash[i] = new Image()
		splash[i].src = file
	}
}
function makeGif()
{
	var gif = new GIF({
	  workers: 2,
	  quality: 10,
	  repeat:0,
	  height:165,
	  width:400
	});

	for (i in splash)
	{
		//Start with the background
		ectx.clearRect(0,0,edit.width,edit.height)
		ectx.drawImage(splash[i],0,0)

		//Image	
		let xoffset = parseInt(document.getElementById('objectionOffsetX').value)
		let yoffset = parseInt(document.getElementById('objectionOffsetY').value)
		let zoffset = parseInt(document.getElementById('objectionOffsetZ').value)

		let zoom = zoffset / 10

		let midx = object.width /2 - (objectionImage.width * zoom) /2 
		let midy = object.height /2 - (objectionImage.height * zoom) /2 

		ectx.drawImage(objectionImage, midx +xoffset, midy +yoffset, objectionImage.width * zoom, objectionImage.height * zoom)

		//Add some black bars
		ectx.fillStyle = "black"
		ectx.fillRect(0,0,edit.width,barSize)
		ectx.fillRect(0,edit.height - barSize,edit.width,barSize)
		
		//Text
		objectoffset = 35

		textTopOffset = parseInt(document.getElementById('topSlider').value)
		textBottomOffset = parseInt(document.getElementById('bottomSlider').value)

		let text = document.getElementById('objectiontop').value
		ectx.font = "32px Bangers"
		ectx.fillStyle = "white"
		mid = object.width/2 - ectx.measureText(text).width/2
		ectx.fillText(text,mid + textTopOffset, objectoffset)

		text = document.getElementById('objectionbottom').value
		ectx.font = "32px Bangers"
		ectx.fillStyle = "white"
		mid = object.width/2 - octx.measureText(text).width/2
		ectx.fillText(text,mid + textBottomOffset, object.height - objectoffset / 4)

		addFrame(ectx,100, gif)
	}

	gif.on('finished', function(blob){
			saveImage(blob)
		});
	gif.render();
}
function saveImage(blob)
{	
	saveBlobAsFile(blob,"objection.gif");
}
function addFrame(c, delay, gif){
	gif.addFrame(c,{copy:true, delay:delay})
}

function saveBlobAsFile(blob, fileName) {

    var reader = new FileReader();

    reader.onloadend = function () {    
        var base64 = reader.result ;
        var link = document.createElement("a");

        link.setAttribute("href", base64);
        link.setAttribute("download", fileName);
        link.click();
    };

    reader.readAsDataURL(blob);
}

loadSplash()

