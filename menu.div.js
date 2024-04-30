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
		<li style="width: 4em;">
			<a href="#" id="listButtonLive">All <i class="fa fa-circle" style="color: red;"></i></a>
		</li>
	</ul>
</div>
<script src="https://code.jquery.com/jquery-3.6.3.min.js" type="text/javascript"></script>
<div class="list" id="progList"><H3>All Programmes:</H3></div>
<div class="list" id="filmList"><H3>All Films:</H3></div>
<div class="list" id="liveList"><H3>All Live:</H3></div><span id="close-btn" class="fa fa-close"></span>
<div id="listOverlay"></div>
<script src="/js/list.js" type="text/javascript"></script>`;
