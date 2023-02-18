module.exports = `<div id="menu">
	<ul>
		<li style="width: 4em;">
			<a href="/" style="width: 4em;" id="home" class="mL">Home</a>
		</li>
		<li id="search">
			<form action="/search">
				<input type="text" id="search-bar" placeholder="Search..." name="q">
				<button type="submit"><i class="fa fa-search"></i></button>
			</form>
		</li>
		<li style="width: 4em;">
			<a href="#" id="listButtonFilm">All <i class="fa fa-film"></i></a>
		</li>
		<li style="width: 4em;">
			<a href="#" id="listButtonProg">All <i class="fa fa-video-camera"></i></a>
		</li>
	</ul>
</div>
<script src="https://code.jquery.com/jquery-3.6.3.min.js" type="text/javascript"></script><script src="/js/list.js" type="text/javascript"></script>
<div class="listOverlay" id="listProg"><div class="list" id="progList"><H3>All Programmes:</H3></div><span class="fa fa-close close-btn"></span></div>
<div class="listOverlay" id="listFilm"><div class="list" id="filmList"><H3>All Programmes:</H3></div><span class="fa fa-close close-btn"></span></div>`;
