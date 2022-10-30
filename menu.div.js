module.exports = `<div id="menu">
	<ul>
		<li style="width: 4em;">
			<a href="/" style="width: 4em;" id="home" class="mL">Home</a>
		</li>
		<li id="search">
			<form action="/search">
				<input type="text" id="search-bar" placeholder="Search..." name="q">
				<button type="submit"><i class="fa-solid fa-search"></i></button>
			</form>
		</li>
		<li style="width: 4em;">
			<a href="#">All<i class="fa-solid fa-camera-movie"></i></a>
		</li>
	</ul>
</div>`;
