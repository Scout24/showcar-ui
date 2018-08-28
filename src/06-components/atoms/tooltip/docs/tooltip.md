<h2>Tooltip<span class="status approved">Approved</span><span class="status js">JS</span></h2>
<style>
#tooltip-2 .sample{
	padding-top:60px;
}
#tooltip-show, #tooltip-hide {
    cursor: pointer;
    font-weight: 900;
}
</style>
<script>
  document.addEventListener('DOMContentLoaded', function() {
  
    var shower = document.querySelector('#tooltip-show');
    var hider = document.querySelector('#tooltip-hide');
    shower.addEventListener('click', () => { document.dispatchEvent(new CustomEvent('show-tooltip-event')); }, false);
    hider.addEventListener('click', () => { document.dispatchEvent(new CustomEvent('hide-tooltip-event')); }, false);
  })
</script>
