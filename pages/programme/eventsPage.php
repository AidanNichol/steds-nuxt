<div class="eventsPage">
    <? $view=new View("displayEvent"); ?>
    <?foreach($events as $ev):?>
        <? $view->set($ev)->render(true);?>
        <!--<?=view::factory("displayEvent", $ev)->render();?>-->
    <?endforeach;?>
</div>