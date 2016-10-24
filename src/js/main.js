import $ from 'jquery';
import _ from 'lodash';

import token from './client-id';
 

$.ajaxSetup({
	data: {
		client_id: token 
		
	}
});
var extractData = function(object){
	var album ={
		title:"",
		image:"",
		stream_link:"",
		name:$(".user_input").val()
	}
	album.title += object.title;
	album.stream_link += object.stream_url;
	if(!object.artwork_url==""){
		album.image += object.artwork_url;
		var content = $(`<div class="block">
								<div class="img" id="album-image" style="width:100%; height:200px; background-size: 100% 100%; background-image: url('${album.image}')" >
    
       							</div>
          						<div class ="song-title">
           					    	<div class="song"> ${album.title} </div>
         						</div>
          						<div class="name">${album.name}</div>
     						 </div>`);
		$(".result-box").append(content);

	content.find("#album-image").click(function(){playAudio(album.title,album.stream_link + "?client_id=" + token)});
	}
}

var playAudio = function(title,stream_url){
	$(".track").html("");
	$(".track").html(title);
	$(".play-mode").attr('src',stream_url);
}



var processData = function(array){
	array.forEach(extractData);
}
	
var getData = function(event){
	$(".result-box").html("");
	var string = $(".user_input").val();
	var results = request(string);
	results.then(processData);
}

function request(string) {
		return $.ajax({
			url : "https://api.soundcloud.com/tracks",
			data:{
				q : string
			},
	
		});
	}
$(".button").click(getData);