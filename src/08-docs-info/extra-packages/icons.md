<h2>Icons</h2>
You can use all the icons defined by showcar-icons with the custom tag `<as24-icon type="[[icon-name]]"></as24-icon>`.

For further information see the documentation under <a href="https://github.com/AutoScout24/showcar-icons" target="_blank">https://github.com/AutoScout24/showcar-icons</a>

We also have standart size classes for styling icons <a href="https://autoscout24.github.io/showcar-ui/#utilities-target" target="_blank">here</a>

The following icon names are currently available:
<ul id="as24-icons-list" class="icons-list"></ul>
<style type="text/css">
#icons as24-icon {
display: inline-block;
width: 50px;
height: 50px;
}
#icons as24-icon svg {
max-width: 100%;
max-height: 100%;
}
#icons .icons-list:after {
content: "";
display: table;
clear: both;
}
#icons .icons-list li {
padding: 20px 10px 10px;
float: left;
background: #f4f4f4;
border: 1px solid #fff;
width: 108px;
height: 130px;
list-style: none;
text-align: center;
margin-bottom: 20px;
}
#icons .icons-list li:hover {
background: #acacac;
}
#icons .icons-list li p {
padding-top: 0;
word-break: break-all;
height: 40px;
font-size: 13px;
}
</style>

<script type="text/javascript">
var iconsList = document.querySelector('#as24-icons-list');
window.showcarIconNames.forEach(function(name) {
var item = document.createElement('li');
item.innerHTML = '<as24-icon type="' + name + '" title="' + name + '"></as24-icon><p>' + name + '</p>';
iconsList.appendChild(item);
});
</script>
