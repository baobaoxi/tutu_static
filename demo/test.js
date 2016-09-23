{%extends "search/searchaladdin/c_base/iphone.bdbox_invoke.tpl"%}
{%block name='data_modifier'%}
    {%$statData = [
            'laid'=> '',
            'xBasicData'=>'',
            'channel'=>'channel=wise&subChannel=wise_aladdin&module=nm_place'
        ]%}
        
    {%$tplData.titleURL = $tplData.titleURL|cat:'&'|cat:$statData.channel%}

    {%if !isset($tplData.list.performance[0])%}
        {%$tplData.list.performance = [$tplData.list.performance]%}
    {%/if%}

            
{%/block%}

{%block name="title"%}
    {%fe_fn_c_box_adaptive_prefix url=$tplData.titleURL ltj="title" laid=$statData.laid undecode='1' class="c-blocka c-title c-gap-top-small c-gap-bottom-small" xse='1'%}
        {%$tplData.xse.xBasicData[] = $statData.xBasicData %}
        {%fe_fn_c_text_inline text = $tplData.title %}
    {%fe_fn_c_box_adaptive_suffix url = $tplData.titleURL%}   
{%/block%}
{%block name='content'%}
    <style  data-merge>
		.wa-nm-place-price {
        	font-size: 0.18rem;
        }
        .wa-nm-place-price-sign {
        	font-size: 0.13rem;
        }
        .wa-nm-place-title {
        	margin-bottom: 0;
        }
    </style>

    {%strip%}
    <div class="c-blocka  c-line-bottom">
        <div class="c-gap-bottom">
            {%foreach $tplData.list.performance as $performance %}
                    {%$performance.buyURL = $performance.buyURL|cat:'&'|cat:$statData.channel|cat:'&s='|cat:$alaData.result.fetchkey%}
            <div class="c-row c-gap-bottom-small">
                <div class="c-span3">
                    {%fe_fn_c_box_adaptive_prefix url=$performance.buyURL ltj="p" laid=$statData.laid undecode='1' class="c-blocka" xse='1'%}
                                {%$tplData.xse.xBasicData[] = $statData.xBasicData%}
                                {%fe_fn_c_img_delay imgsrc=$performance.imgURL type="s"%}
                     {%fe_fn_c_box_adaptive_suffix url=$performance.buyURL%} 
                </div>
                <div class="c-span9">
                    {%fe_fn_c_box_adaptive_prefix url=$performance.buyURL ltj="l" laid=$statData.laid undecode='1' class="c-blocka" xse='1'%}
                        {%$tplData.xse.xBasicData[] = $statData.xBasicData%}

                        <div class="c-line-clamp2 c-color wa-nm-place-title">
                            {%fe_fn_c_box_adaptive_prefix url=$performance.buyURL class="c-blocka c-color" undecode=1 ltj="l"%}
                                {%$performance.performanceName|escape:'html'%}
                            {%fe_fn_c_box_adaptive_suffix url=$performance.buyURL%}
                        </div>
                    {%fe_fn_c_box_adaptive_suffix url=$performance.buyURL%}   

                    {%fe_fn_c_box_adaptive_prefix url=$performance.buyURL ltj="l" laid=$statData.laid undecode='1' class="c-blocka" xse='1'%}
                        {%$tplData.xse.xBasicData[] = $statData.xBasicData%}                
                        <div class="c-color-gray">
                            {%if $performance.startTime != $performance.endTime %}
                                {%$performance.startTime|escape:'html'%}<span> - </span>{%$performance.endTime|escape:'html'%}
                            {%else%}
                                {%$performance.startTime|escape:'html'%}
                            {%/if%}
                         </div>
                         <div class="c-color-orange wa-nm-place-price">
                            <span class="c-gap-right-small wa-nm-place-price-sign">¥</span>
                                {%if $performance.minPrice != $performance.maxPrice%}
                                    {%$performance.minPrice|escape:'html'%}<span>-</span>{%$performance.maxPrice|escape:'html'%}
                                {%else%}
                                    {%$performance.minPrice|escape:'html'%}
                                {%/if%}
                            {%if $performance.discount%}
                            <span class="c-text-box c-text-box-red c-gap-left">{%$performance.discount|escape:'html'%}</span>
                            {%/if%}
                         </div>
                     {%fe_fn_c_box_adaptive_suffix url=$performance.buyURL%}   

                </div>
            </div>
            {%/foreach%}
         </div>
    </div>
    {%/strip%}
    <script data-merge>
		
    </script>
{%/block%}

{%block name="foot"%}
<div class="c-row c-gap-top">
    <div class="c-span6">
        <div class="c-line-clamp1">
            <span class="c-color-gray">百度糯米</span>
            <span class="c-foot-icon c-foot-icon-16 c-foot-icon-16-aladdin c-gap-left-small"></span>
        </div>
    </div>
    <div class="c-span6">
          {%fe_fn_c_box_adaptive_prefix url=$tplData.titleURL ltj="l" laid=$statData.laid undecode='1' class="c-blocka c-moreinfo" xse='1'%}
        <i class="c-icon c-gap-left-small">&#xe734</i>
         {%fe_fn_c_box_adaptive_suffix url=$tplData.titleURL%}   

    </div>
 </div>
{%/block%}