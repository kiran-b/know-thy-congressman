;(function(f){f.ui={plugin:{add:function(b,a,c){var g=f.ui[b].prototype;for(var h in c){g.plugins[h]=g.plugins[h]||[];g.plugins[h].push([a,c[h]])}},call:function(b,a,c){var g=b.plugins[a];if(!g){return}for(var h=0;h<g.length;h++){if(b.options[g[h][0]]){g[h][1].apply(b.element,c)}}}},cssCache:{},css:function(b){if(f.ui.cssCache[b]){return f.ui.cssCache[b]}var a=f('<div class="ui-gen">').addClass(b).css({position:'absolute',top:'-5000px',left:'-5000px',display:'block'}).appendTo('body');f.ui.cssCache[b]=!!((!(/auto|default/).test(a.css('cursor'))||(/^[1-9]/).test(a.css('height'))||(/^[1-9]/).test(a.css('width'))||!(/none/).test(a.css('backgroundImage'))||!(/transparent|rgba\(0, 0, 0, 0\)/).test(a.css('backgroundColor'))));try{f('body').get(0).removeChild(a.get(0))}catch(e){}return f.ui.cssCache[b]},disableSelection:function(b){f(b).attr('unselectable','on').css('MozUserSelect','none')},enableSelection:function(b){f(b).attr('unselectable','off').css('MozUserSelect','')},hasScroll:function(b,a){var c=/top/.test(a||"top")?'scrollTop':'scrollLeft',g=false;if(b[c]>0)return true;b[c]=1;g=b[c]>0?true:false;b[c]=0;return g}};var l=f.fn.remove;f.fn.remove=function(){f("*",this).add(this).triggerHandler("remove");return l.apply(this,arguments)};function m(b,a,c){var g=f[b][a].getter||[];g=(typeof g=="string"?g.split(/,?\s+/):g);return(f.inArray(c,g)!=-1)}f.widget=function(i,d){var k=i.split(".")[0];i=i.split(".")[1];f.fn[i]=function(a){var c=(typeof a=='string'),g=Array.prototype.slice.call(arguments,1);if(c&&m(k,i,a)){var h=f.data(this[0],i);return(h?h[a].apply(h,g):undefined)}return this.each(function(){var b=f.data(this,i);if(c&&b&&f.isFunction(b[a])){b[a].apply(b,g)}else if(!c){f.data(this,i,new f[k][i](this,a))}})};f[k][i]=function(g,h){var j=this;this.widgetName=i;this.widgetBaseClass=k+'-'+i;this.options=f.extend({},f.widget.defaults,f[k][i].defaults,h);this.element=f(g).bind('setData.'+i,function(b,a,c){return j.setData(a,c)}).bind('getData.'+i,function(b,a){return j.getData(a)}).bind('remove',function(){return j.destroy()});this.init()};f[k][i].prototype=f.extend({},f.widget.prototype,d)};f.widget.prototype={init:function(){},destroy:function(){this.element.removeData(this.widgetName)},getData:function(b){return this.options[b]},setData:function(b,a){this.options[b]=a;if(b=='disabled'){this.element[a?'addClass':'removeClass'](this.widgetBaseClass+'-disabled')}},enable:function(){this.setData('disabled',false)},disable:function(){this.setData('disabled',true)}};f.widget.defaults={disabled:false};f.ui.mouse={mouseInit:function(){var a=this;this.element.bind('mousedown.'+this.widgetName,function(b){return a.mouseDown(b)});if(f.browser.msie){this._mouseUnselectable=this.element.attr('unselectable');this.element.attr('unselectable','on')}this.started=false},mouseDestroy:function(){this.element.unbind('.'+this.widgetName);(f.browser.msie&&this.element.attr('unselectable',this._mouseUnselectable))},mouseDown:function(a){(this._mouseStarted&&this.mouseUp(a));this._mouseDownEvent=a;var c=this,g=(a.which==1),h=(typeof this.options.cancel=="string"?f(a.target).parents().add(a.target).filter(this.options.cancel).length:false);if(!g||h||!this.mouseCapture(a)){return true}this._mouseDelayMet=!this.options.delay;if(!this._mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){c._mouseDelayMet=true},this.options.delay)}if(this.mouseDistanceMet(a)&&this.mouseDelayMet(a)){this._mouseStarted=(this.mouseStart(a)!==false);if(!this._mouseStarted){a.preventDefault();return true}}this._mouseMoveDelegate=function(b){return c.mouseMove(b)};this._mouseUpDelegate=function(b){return c.mouseUp(b)};f(document).bind('mousemove.'+this.widgetName,this._mouseMoveDelegate).bind('mouseup.'+this.widgetName,this._mouseUpDelegate);return false},mouseMove:function(b){if(f.browser.msie&&!b.button){return this.mouseUp(b)}if(this._mouseStarted){this.mouseDrag(b);return false}if(this.mouseDistanceMet(b)&&this.mouseDelayMet(b)){this._mouseStarted=(this.mouseStart(this._mouseDownEvent,b)!==false);(this._mouseStarted?this.mouseDrag(b):this.mouseUp(b))}return!this._mouseStarted},mouseUp:function(b){f(document).unbind('mousemove.'+this.widgetName,this._mouseMoveDelegate).unbind('mouseup.'+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this.mouseStop(b)}return false},mouseDistanceMet:function(b){return(Math.max(Math.abs(this._mouseDownEvent.pageX-b.pageX),Math.abs(this._mouseDownEvent.pageY-b.pageY))>=this.options.distance)},mouseDelayMet:function(b){return this._mouseDelayMet},mouseStart:function(b){},mouseDrag:function(b){},mouseStop:function(b){},mouseCapture:function(b){return true}};f.ui.mouse.defaults={cancel:null,distance:1,delay:0}})(jQuery);(function(d){d.widget("ui.draggable",d.extend({},d.ui.mouse,{init:function(){var b=this.options;if(b.helper=='original'&&!(/(relative|absolute|fixed)/).test(this.element.css('position')))this.element.css('position','relative');this.element.addClass('ui-draggable');(b.disabled&&this.element.addClass('ui-draggable-disabled'));this.mouseInit()},mouseStart:function(b){var a=this.options;if(this.helper||a.disabled||d(b.target).is('.ui-resizable-handle'))return false;var c=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==b.target)c=true});if(!c)return false;if(d.ui.ddmanager)d.ui.ddmanager.current=this;this.helper=d.isFunction(a.helper)?d(a.helper.apply(this.element[0],[b])):(a.helper=='clone'?this.element.clone():this.element);if(!this.helper.parents('body').length)this.helper.appendTo((a.appendTo=='parent'?this.element[0].parentNode:a.appendTo));if(this.helper[0]!=this.element[0]&&!(/(fixed|absolute)/).test(this.helper.css("position")))this.helper.css("position","absolute");this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)};this.cssPosition=this.helper.css("position");this.offset=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.offset.click={left:b.pageX-this.offset.left,top:b.pageY-this.offset.top};this.offsetParent=this.helper.offsetParent();var g=this.offsetParent.offset();if(this.offsetParent[0]==document.body&&d.browser.mozilla)g={top:0,left:0};this.offset.parent={top:g.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:g.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};var h=this.element.position();this.offset.relative=this.cssPosition=="relative"?{top:h.top-(parseInt(this.helper.css("top"),10)||0)+this.offsetParent[0].scrollTop,left:h.left-(parseInt(this.helper.css("left"),10)||0)+this.offsetParent[0].scrollLeft}:{top:0,left:0};this.originalPosition=this.generatePosition(b);this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};if(a.cursorAt){if(a.cursorAt.left!=undefined)this.offset.click.left=a.cursorAt.left+this.margins.left;if(a.cursorAt.right!=undefined)this.offset.click.left=this.helperProportions.width-a.cursorAt.right+this.margins.left;if(a.cursorAt.top!=undefined)this.offset.click.top=a.cursorAt.top+this.margins.top;if(a.cursorAt.bottom!=undefined)this.offset.click.top=this.helperProportions.height-a.cursorAt.bottom+this.margins.top}if(a.containment){if(a.containment=='parent')a.containment=this.helper[0].parentNode;if(a.containment=='document'||a.containment=='window')this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,d(a.containment=='document'?document:window).width()-this.offset.relative.left-this.offset.parent.left-this.helperProportions.width-this.margins.left-(parseInt(this.element.css("marginRight"),10)||0),(d(a.containment=='document'?document:window).height()||document.body.parentNode.scrollHeight)-this.offset.relative.top-this.offset.parent.top-this.helperProportions.height-this.margins.top-(parseInt(this.element.css("marginBottom"),10)||0)];if(!(/^(document|window|parent)$/).test(a.containment)){var j=d(a.containment)[0];var i=d(a.containment).offset();this.containment=[i.left+(parseInt(d(j).css("borderLeftWidth"),10)||0)-this.offset.relative.left-this.offset.parent.left,i.top+(parseInt(d(j).css("borderTopWidth"),10)||0)-this.offset.relative.top-this.offset.parent.top,i.left+Math.max(j.scrollWidth,j.offsetWidth)-(parseInt(d(j).css("borderLeftWidth"),10)||0)-this.offset.relative.left-this.offset.parent.left-this.helperProportions.width-this.margins.left-(parseInt(this.element.css("marginRight"),10)||0),i.top+Math.max(j.scrollHeight,j.offsetHeight)-(parseInt(d(j).css("borderTopWidth"),10)||0)-this.offset.relative.top-this.offset.parent.top-this.helperProportions.height-this.margins.top-(parseInt(this.element.css("marginBottom"),10)||0)]}}this.propagate("start",b);this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()};if(d.ui.ddmanager&&!a.dropBehaviour)d.ui.ddmanager.prepareOffsets(this,b);this.helper.addClass("ui-draggable-dragging");this.mouseDrag(b);return true},convertPositionTo:function(b,a){if(!a)a=this.position;var c=b=="absolute"?1:-1;return{top:(a.top+this.offset.relative.top*c+this.offset.parent.top*c-(this.cssPosition=="fixed"||(this.cssPosition=="absolute"&&this.offsetParent[0]==document.body)?0:this.offsetParent[0].scrollTop)*c+(this.cssPosition=="fixed"?d(document).scrollTop():0)*c+this.margins.top*c),left:(a.left+this.offset.relative.left*c+this.offset.parent.left*c-(this.cssPosition=="fixed"||(this.cssPosition=="absolute"&&this.offsetParent[0]==document.body)?0:this.offsetParent[0].scrollLeft)*c+(this.cssPosition=="fixed"?d(document).scrollLeft():0)*c+this.margins.left*c)}},generatePosition:function(b){var a=this.options;var c={top:(b.pageY-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"||(this.cssPosition=="absolute"&&this.offsetParent[0]==document.body)?0:this.offsetParent[0].scrollTop)-(this.cssPosition=="fixed"?d(document).scrollTop():0)),left:(b.pageX-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"||(this.cssPosition=="absolute"&&this.offsetParent[0]==document.body)?0:this.offsetParent[0].scrollLeft)-(this.cssPosition=="fixed"?d(document).scrollLeft():0))};if(!this.originalPosition)return c;if(this.containment){if(c.left<this.containment[0])c.left=this.containment[0];if(c.top<this.containment[1])c.top=this.containment[1];if(c.left>this.containment[2])c.left=this.containment[2];if(c.top>this.containment[3])c.top=this.containment[3]}if(a.grid){var g=this.originalPosition.top+Math.round((c.top-this.originalPosition.top)/a.grid[1])*a.grid[1];c.top=this.containment?(!(g<this.containment[1]||g>this.containment[3])?g:(!(g<this.containment[1])?g-a.grid[1]:g+a.grid[1])):g;var h=this.originalPosition.left+Math.round((c.left-this.originalPosition.left)/a.grid[0])*a.grid[0];c.left=this.containment?(!(h<this.containment[0]||h>this.containment[2])?h:(!(h<this.containment[0])?h-a.grid[0]:h+a.grid[0])):h}return c},mouseDrag:function(b){this.position=this.generatePosition(b);this.positionAbs=this.convertPositionTo("absolute");this.position=this.propagate("drag",b)||this.position;if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+'px';if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+'px';if(d.ui.ddmanager)d.ui.ddmanager.drag(this,b);return false},mouseStop:function(b){var a=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)var a=d.ui.ddmanager.drop(this,b);if((this.options.revert=="invalid"&&!a)||(this.options.revert=="valid"&&a)||this.options.revert===true){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revert,10)||500,function(){c.propagate("stop",b);c.clear()})}else{this.propagate("stop",b);this.clear()}return false},clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.options.helper!='original'&&!this.cancelHelperRemoval)this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},plugins:{},uiHash:function(b){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,options:this.options}},propagate:function(b,a){d.ui.plugin.call(this,b,[a,this.uiHash()]);if(b=="drag")this.positionAbs=this.convertPositionTo("absolute");return this.element.triggerHandler(b=="drag"?b:"drag"+b,[a,this.uiHash()],this.options[b])},destroy:function(){if(!this.element.data('draggable'))return;this.element.removeData("draggable").unbind(".draggable").removeClass('ui-draggable');this.mouseDestroy()}}));d.extend(d.ui.draggable,{defaults:{appendTo:"parent",axis:false,cancel:":input",delay:0,distance:1,helper:"original"}});d.ui.plugin.add("draggable","cursor",{start:function(b,a){var c=d('body');if(c.css("cursor"))a.options._cursor=c.css("cursor");c.css("cursor",a.options.cursor)},stop:function(b,a){if(a.options._cursor)d('body').css("cursor",a.options._cursor)}});d.ui.plugin.add("draggable","zIndex",{start:function(b,a){var c=d(a.helper);if(c.css("zIndex"))a.options._zIndex=c.css("zIndex");c.css('zIndex',a.options.zIndex)},stop:function(b,a){if(a.options._zIndex)d(a.helper).css('zIndex',a.options._zIndex)}});d.ui.plugin.add("draggable","opacity",{start:function(b,a){var c=d(a.helper);if(c.css("opacity"))a.options._opacity=c.css("opacity");c.css('opacity',a.options.opacity)},stop:function(b,a){if(a.options._opacity)d(a.helper).css('opacity',a.options._opacity)}});d.ui.plugin.add("draggable","iframeFix",{start:function(b,a){d(a.options.iframeFix===true?"iframe":a.options.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(d(this).offset()).appendTo("body")})},stop:function(b,a){d("div.DragDropIframeFix").each(function(){this.parentNode.removeChild(this)})}})})(jQuery);