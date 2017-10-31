var builder = {
	sortableObj:{
		'.container':{
			cursor: 'move',
			helper: 'clone',
			items : 'h1, h2, h3, h4, h5, p, .btn, ._vb_dynamic-element',
			cancel: '._vb_element-editing',
			start: function(event, ui) {
				if (ui.item && ui.item[0]) {
					ui.placeholder.addClass(ui.item[0].className);
					ui.placeholder.html(ui.item.html());
				}
			},
			placeholder: '_vb_element-placeholder'
		}, 
		'ul.nav': {
			cursor: 'move',
			helper: 'clone',
			items : 'li',
			connectWith : 'ul.nav',
			cancel: '._vb_element-editing',
			start: function(event, ui) {
				if (ui.item && ui.item[0]) {
					ui.placeholder.addClass(ui.item[0].className);
					ui.placeholder.html(ui.item.html());
				}
			},
			placeholder: '_vb_element-placeholder'
		},
		'.row': {
			cursor: 'move',
			helper: 'clone',
			handle: '._vb_ctrler-item.column',
			items : '.col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9,'+
					'.col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9,'+
					'.col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9',
			cancel: '._vb_element-editing',
			start: function(event, ui) {
				if (ui.item && ui.item[0]) {
					ui.placeholder.addClass(ui.item[0].className);
					ui.placeholder.html(ui.item.html());
				}
			},
			placeholder: '_vb_element-placeholder'
		}},
	init : function(){
		var dragStartIndex, dragNewIndex;
		$( '#templateWrapper' ).sortable({
			placeholder: 'template_placeholder',
			items: ' > li:not([data-static="true"])',
			handle: '._vb_ctrler-item.move',
			axis: 'y',
			revert: true,
			start: function(event, ui){
				dragStartIndex = ui.item.index();
			},
			update: function(event, ui){
				dragNewIndex = ui.item.index();

				if (typeof dragStartIndex !== 'undefined' && typeof dragNewIndex !== 'undefined') {
					var indexData = { 
						dragStartIndex 	: dragStartIndex,
						dragNewIndex 	: dragNewIndex 
					};
					// dispatch custom defined event
					var customEvent = new CustomEvent('updateOrder', {
						detail: indexData
					});
					document.dispatchEvent(customEvent);
				}

			},
			stop: function() {
				//$(this).sortable('cancel');
			},
			receive: function() { }
		});
	},
	applySortable : function() {
		for(var object in this.sortableObj) {
			$(object).sortable(this.sortableObj[object]);
		}
	},
	refresh: function() {
		$( "#templateWrapper" ).sortable( "refresh" );
	}
};

$(document).ready(function() {
	
	/**
	 * Apply jQuery UI Sortable
	 */
	$(document).keydown(function(e) {	
		// trap the return key being pressed
		if (e.keyCode === 13 && (e.target.tagName == 'p' || e.target.className == 'editContent')) {
		// insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
			document.execCommand('insertHTML', false, '<br><br>');
		// prevent the default behaviour of return key pressed
			return false;
		}
		return true;
	});

	setTimeout(function(){
		builder.init();
		builder.applySortable();
	}, 500);
	$(document).on('DOMNodeInserted', function(e) {
		var target = e.target;
			setTimeout(function(){
				$('.col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8,'+
					'.col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8'+
					'.col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8', $(target))
				.map(function(){
					if ($(this).find('._vb_col-ctrler').length == 0) {
						var columnCtrler = '<div class="_vb_col-ctrler">'+
											'<a class="_vb_ctrler-item remove"><i class="fa fa-trash _vb_ctrler-item remove"></i></a>'+
											'<a class="_vb_ctrler-item column"><i class="fa fa-arrows _vb_ctrler-item column"></i></a>'+
											'</div>';
						$(this).prepend(columnCtrler);
					}
				});
				builder.applySortable();
				builder.refresh();
			}, 500);
	});
});
