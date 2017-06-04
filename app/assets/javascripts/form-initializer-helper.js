(function($) {
    $.fn.bindFirst = function(/*String*/ eventType, /*[Object])*/ eventData, /*Function*/ handler) {
        var indexOfDot = eventType.indexOf(".");
        var eventNameSpace = indexOfDot > 0 ? eventType.substring(indexOfDot) : "";

        eventType = indexOfDot > 0 ? eventType.substring(0, indexOfDot) : eventType;
        handler = handler == undefined ? eventData : handler;
        eventData = typeof eventData == "function" ? {} : eventData;

        return this.each(function() {
            var $this = $(this);
            var currentAttrListener = this["on" + eventType];

            if (currentAttrListener) {
                $this.bind(eventType, function(e) {
                    return currentAttrListener(e.originalEvent); 
                });

                this["on" + eventType] = null;
            }

            $this.bind(eventType + eventNameSpace, eventData, handler);

            var allEvents = $this.data("events") || $._data($this[0], "events");
            var typeEvents = allEvents[eventType];
            var newEvent = typeEvents.pop();
            typeEvents.unshift(newEvent);
        });
    };
})(jQuery);

function applyTooltipWarning(selector) {
	$(selector).tooltip({
		html: true,
		trigger: 'manual',
		container: 'body',
		placement: 'top',
		animation: true,
		template: '<div class="tooltip warning" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
	});
}

function initializeRequired() {
	applyTooltipWarning('.required');
	$('.required').focusin(function () {
   		$(this).tooltip('hide');
   	});
	$('.required').focusout(function (e) {
		if ($.trim($(this).val()).length == 0 || $(this).val() <= 0)
			$(this).data('isValid', false); 
		else $(this).data('isValid', true); 
		
		setTimeout($.proxy(function() {
			if ($.trim($(this).val()).length == 0 || $(this).val() <= 0) {
   				$(this).attr('data-original-title',
	   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-asterisk"></span></div>' +
					'<div class="tooltip-content">This field is <b>required</b> and should not be empty.</div>');
				
   				$(this).tooltip('show');
   				$(this).closest('div[class*="form-group"]').addClass('pd-has-error');
   				setTimeout($.proxy(function() { $(this).tooltip('hide'); }, this), 3000);
	   		} else {
	   			$(this).closest('div[class*="form-group"]').removeClass('pd-has-error');
	   		}
		}, this), 200);
   	});
}

function initializeRequiredChecked() {
	applyTooltipWarning('.required-checked');
	$('.required-checked').focusin(function () {
   		$(this).tooltip('hide');
   	});
	$('.required-checked').focusout(function (e) {
		if (!$(this).is(':checked'))
			$(this).data('isValid', false); 
		else $(this).data('isValid', true);
		
		setTimeout($.proxy(function() {
			if (!$(this).is(':checked')) {
				$(this).attr('data-original-title',
	   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-check"></span></div>' +
					'<div class="tooltip-content">This checkbox is <b>required</b> and should not be unchecked.</div>');
				$(this).tooltip('show');
				$(this).closest('div[class*="form-group"]').addClass('pd-has-error');
				setTimeout($.proxy(function() { $(this).tooltip('hide'); }, this), 3000);
			} else {
	   			$(this).closest('div[class*="form-group"]').removeClass('pd-has-error');
	   		}
		}, this), 200);
   	});
}

function initializeRequiredEither(primarySelector, secondarySelector, primaryName, secondaryName) {
	applyTooltipWarning(primarySelector);
	$(primarySelector).focusin(function () {
   		$(primarySelector).tooltip('hide');
   	});
   	$(secondarySelector).focusin(function () {
   		$(primarySelector).tooltip('hide');
   	});
   	
	$(primarySelector).focusout(function () { _requiredEitherFunction(primarySelector, secondarySelector, primaryName, secondaryName); });
	$(secondarySelector).focusout(function () { _requiredEitherFunction(primarySelector, secondarySelector, primaryName, secondaryName); });
}

function _requiredEitherFunction(primarySelector, secondarySelector, primaryName, secondaryName) {
	if ($.trim($(primarySelector).val()).length == 0 &&
		$.trim($(secondarySelector).val()).length == 0)
		$(primarySelector).data('isValid', false);
	else $(primarySelector).data('isValid', true); 
	
	setTimeout(function() {
		if ($.trim($(primarySelector).val()).length == 0 &&
			$.trim($(secondarySelector).val()).length == 0) {
			$(primarySelector).attr('data-original-title',
   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-asterisk"></span></div>' +
				'<div class="tooltip-content">Either ' + primaryName + ' or ' + secondaryName + ' is <b>required</b> and should not be empty.</div>');
			$(primarySelector).tooltip('show');
			$(primarySelector).closest('div[class*="form-group"]').addClass('pd-has-error');
			setTimeout(function() { $(primarySelector).tooltip('hide'); }, 3000);
		} else {
   			$(primarySelector).closest('div[class*="form-group"]').removeClass('pd-has-error');
   		}
	}, 200);
}

function initializeNumberOnly() {
	applyTooltipWarning('.number-only');
	$('.number-only').keypress(function (e) {
    	if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
    		$(this).attr('data-original-title',
    			'<div class="tooltip-icon"><span class="glyphicon glyphicon-sound-5-1"></span></div>' +
				'<div class="tooltip-content">Only <b>number</b> is allowed.</div>');
    		$(this).tooltip('show');
    		setTimeout($.proxy(function() { $(this).tooltip('hide'); }, this), 3000);		
	        return false;
	    } else {
	    	$(this).tooltip('hide');
	    }
   	});
   	$('.number-only').focusout(function () {
   		$(this).tooltip('hide');
   	});
}

function initializeContactNumberMasks() {
	$('.mobile_number').mask('999-999-9999');
	$('.mobile_number').focusout(function(){
		if($(this).val().length < 12) {
			$(this).val('');
		}
	});
	$('.telephone_number').mask('(099) 999-9999', { placeholder: ' ' });
	$('.telephone_number').focusout(function(){
		if($(this).val().length < 14) {
			$(this).val('');
		}
	});
}


function initializeGenderPrefix(id) {
	$('#' + id + '_prefix_id').change(function() {
		if($('#' + id + '_prefix_id').val()== 1) {
			$('#' + id + '_gender_id').val(1);
		}
		else {
			$('#' + id + '_gender_id').val(2);
		}
	});
	
	$('#' + id + '_gender_id').change(function() {
		if($('#' + id + '_gender_id').val()== 1) {
			$('#' + id + '_prefix_id').val(1);
		}
		else {
			$('#' + id + '_prefix_id').val(2);
		}
	});
}

function isDate(txtDate)
{
	var currVal = txtDate;
  	if(currVal == '')
    	return false;

	var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
  	var dtArray = currVal.match(rxDatePattern);

  	if (dtArray == null)
    	return false;
  
  	dtMonth = dtArray[1];
  	dtDay= dtArray[3];
  	dtYear = dtArray[5];

  	if (dtMonth < 1 || dtMonth > 12)
      	return false;
  	else if (dtDay < 1 || dtDay> 31)
      	return false;
  	else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
      	return false;
  	else if (dtMonth == 2)
  	{
    	var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
     	if (dtDay> 29 || (dtDay ==29 && !isleap))
          	return false;
  	}
	
  	return true;
}

function isValidDateRange(currVal, minDate, maxDate) {
	if (minDate === null || maxDate === null || !minDate || !maxDate )
		return true;
		
	var currValDt = $.datepicker.parseDate('mm/dd/yy', currVal);
	if (currValDt < $.datepicker.parseDate('mm/dd/yy', minDate) ||
	 	currValDt > $.datepicker.parseDate('mm/dd/yy', maxDate)) {
		return false;
	}
	return true;
}

function initializeDatePicker(identifiyer, _minDate, _maxDate) {
	$(identifiyer).attr('placeholder', 'mm/dd/yyyy');
	$(identifiyer).mask('99/99/9999', { placeholder: ' ' });
	
	$(identifiyer).datepicker({
		dateFormat: 'mm/dd/yy',
		minDate: _minDate,
		maxDate: _maxDate
	});
	
	applyTooltipWarning(identifiyer);
	$(identifiyer).focusin(function () {
   		$(this).tooltip('hide');
   	});
   	
	$(identifiyer).focusout(function (e) {
		if ($.trim($(this).val()).length != 0 && !isDate($(this).val()))
			$(this).data('isValid', false);
   		else if ($.trim($(this).val()).length != 0 && !isValidDateRange($(this).val(), _minDate, _maxDate))
			$(this).data('isValid', false);
   		else $(this).data('isValid', true);
   		
		setTimeout($.proxy(function() {
			if ($.trim($(this).val()).length != 0 && !isDate($(this).val())) {
   				$(this).attr('data-original-title',
	   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-calendar"></span></div>' +
					'<div class="tooltip-content">Please enter a valid <b>date format</b>. (e.g. 03/28/1972)</div>');
   				$(this).tooltip('show');
   				$(this).closest('div[class*="form-group"]').addClass('pd-has-error');
   				setTimeout($.proxy(function() { $(this).tooltip('hide'); }, this), 3000);
	   		}
	   		else if ($.trim($(this).val()).length != 0 && !isValidDateRange($(this).val(), _minDate, _maxDate)) {
				$(this).attr('data-original-title',
	   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-calendar"></span></div>' +
					'<div class="tooltip-content">The <b>date is not applicable</b> for this field. Only ' + _minDate + ' to ' + _maxDate + ' is allowed.</div>');
   				$(this).tooltip('show');
   				$(this).closest('div[class*="form-group"]').addClass('pd-has-error');
   				setTimeout($.proxy(function() { $(this).tooltip('hide'); }, this), 5000);
	   		} else if ($.trim($(this).val()).length != 0) {
	   			$(this).closest('div[class*="form-group"]').removeClass('pd-has-error');
	   			
	   			if ($(this).hasClass('c2c-date').toString() == 'false' ){
	   				$('#calcPremResult_container').animate({width:'200px'},100);
		    		$('#showHideCalcPremResult').show();
		    		$('#showHide span').removeClass("glyphicon glyphicon-chevron-right");
		    		$('#showHide span').addClass("glyphicon glyphicon-chevron-left");	   			
	   			}
	   		}
		}, this), 250);
   	});
}

function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function initializeEmailValidator() {
	applyTooltipWarning('.validate-email');
	$('.validate-email').focusin(function () {
   		$(this).tooltip('hide');
   	});
	$('.validate-email').focusout(function (e) {
		if ($.trim($(this).val()).length == 0 || !IsEmail($(this).val()))
			$(this).data('isValid', false); 
		else $(this).data('isValid', true); 
		
		setTimeout($.proxy(function() {
			if ($.trim($(this).val()).length != 0 && !IsEmail($(this).val())) {
   				$(this).attr('data-original-title',
	   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-envelope"></span></div>' +
					'<div class="tooltip-content">Please enter a valid <b>email address format</b>. (e.g. name@email.com)</div>');
   				$(this).tooltip('show');
   				$(this).closest('div[class*="form-group"]').addClass('pd-has-error');
   				setTimeout($.proxy(function() { $(this).tooltip('hide'); }, this), 3000);
   			} else if ($.trim($(this).val()).length != 0) {
	   			$(this).closest('div[class*="form-group"]').removeClass('pd-has-error');
	   		}
		}, this), 250);
   	});
}

function yesNoChange(yesNoIdentifiyer, yesNoDivIdentifiyer) {
	var isYes = false;
	$(yesNoIdentifiyer).each(function() {
		if ($(this).val() == 'Yes') {
			isYes = true;
		}
	});
	if(isYes) {
		$(yesNoDivIdentifiyer).show('fast');
	}
	else {
		$(yesNoDivIdentifiyer).hide('fast');
	}
	
	return isYes;
}

function initializeRemoveRowButton(removeButtonIdentifiyer, parentClass, onRemoveCallback) {
	$(removeButtonIdentifiyer).click(function() {
		removeMe = $(this).parents('div[class*="' + parentClass + '"]').first();
		removeMe.hide('fast', function() { if(onRemoveCallback && (typeof onRemoveCallback == "function")) { onRemoveCallback(); } removeMe.remove(); });
		return false;
	});
}

function initializeSubmitValidator(submitButtonIdentifiyer, onValidCallback, onInvalidCallback){
	$(submitButtonIdentifiyer).click(function (e) {
		//e.preventDefault();
		$(submitButtonIdentifiyer).prop('disabled', true);
		$('.loading').show('fast');
		
			var isAllValid = true;
			$('.required, .required-checked, .required-either, .validate-date, .getPlateVal, .checkAge, .minimum').each(function() {
				$(this).focusout();					
			    isAllValid = isAllValid && $(this).data('isValid');
			});
			if (isAllValid) {
				if(onValidCallback && (typeof onValidCallback == "function")) { onValidCallback(); }
			}
			else {
				if(onInvalidCallback && (typeof onInvalidCallback == "function")) { onInvalidCallback(); }
				$('body,html').stop(true,true).animate({scrollTop: 100}, 800, 'easeOutQuint');
				$('#alert').show('fast');
				e.preventDefault();
			}
			$(submitButtonIdentifiyer).prop('disabled', false);
			$('.loading').hide('fast');
		
	});
}



var _addRequiredFocusInHandler = function () {
	$(this).tooltip('hide');
}
var _addRequiredFocusOutHandler = function () {
	if ($.trim($(this).val()).length == 0)
		$(this).data('isValid', false); 
	else $(this).data('isValid', true); 
	
	setTimeout($.proxy(function() {
		if ($.trim($(this).val()).length == 0) {
			$(this).attr('data-original-title',
   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-asterisk"></span></div>' +
				'<div class="tooltip-content">This field is <b>required</b> and should not be empty.</div>');
			$(this).tooltip('show');
			$(this).closest('div[class*="form-group"]').addClass('pd-has-error');
			setTimeout($.proxy(function() { $(this).tooltip('hide'); }, this), 3000);
		} else {
   			$(this).closest('div[class*="form-group"]').removeClass('pd-has-error');
   		}
	}, this), 200);
}

function initializeRequiredJIT(selector) {
	applyTooltipWarning(selector);
	$(selector).bindFirst('focusin', null, _addRequiredFocusInHandler);
	$(selector).bindFirst('focusout', null, _addRequiredFocusOutHandler);
   	$(selector).addClass('required');
}

function unInitializeRequiredJIT(selector) {
	$(selector).text('');
	$(selector).tooltip('hide');
	$(selector).off('tooltip');
	$(selector).off('focusin', _addRequiredFocusInHandler);
	$(selector).off('focusout', _addRequiredFocusOutHandler);
	$(selector).removeClass('required');
	$(selector).data('isValid', true);
}

// To Validate Plate Number
function initializeGetPlate(){
	applyTooltipWarning('.getPlateVal');
	$(this).focusin(function () {
   		$(this).tooltip('hide');
   	});
	$('.getPlateVal').on('change focusout',function() {				
 			var getPlate = $(this).val();
 			var date = new Date();
 			var monthNames = ["January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November", "December"
			];			
 			var monthArray = [9];
 				monthArray[0] = ['February', 2,3,4];
 				monthArray[1] = ['March', 3,4,5];
 				monthArray[2] = ['April', 4,5,6];
 				monthArray[3] = ['May', 5,6,7];
 				monthArray[4] = ['June', 6,7,8];
 				monthArray[5] = ['July', 7,8,9];
 				monthArray[6] = ['August', 8,9,0];
 				monthArray[7] = ['September', 9,0,1];
 				monthArray[8] = ['October', 0,1,2];
 				monthArray[9] = ['November', 1,2,3];
    		var monthNow = monthNames[date.getMonth()];
    		var endingNum = '';
    		$.each(monthArray, function(x,y){
	    			if(monthNow == monthArray[x][0]){
	    				if(getPlate.slice(-1) == monthArray[x][1] || getPlate.slice(-1) == monthArray[x][2] || getPlate.slice(-1) == monthArray[x][3] && getPlate.slice(-1) != "_"){
					   		
	    					$(".getPlateVal").data('isValid', true);			   					
	    				}
	    				else{
					   		$(".getPlateVal").data('isValid', false);  		
	    				}
	    			} 
	    		});
	    		
    		setTimeout($.proxy(function() {  
	    		$.each(monthArray, function(x,y){
	    			if(monthNow == monthArray[x][0]){
	    				if(getPlate.slice(-1) == monthArray[x][1] || getPlate.slice(-1) == monthArray[x][2] || getPlate.slice(-1) == monthArray[x][3] && getPlate.slice(-1) != "_"){
					   		$('.getPlateVal').closest('div[class*="form-group"]').removeClass('has-error');	    					   					
	    				}
	    				else{ 
	    					endingNum = monthArray[x][1] + ', ' + monthArray[x][2] + ', and ' + monthArray[x][3];
					   			$('.getPlateVal').attr('data-original-title',
						   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-asterisk"></span></div>' +
										'<div class="tooltip-content">Accepting Plate Numbers Ending from ' + endingNum + '</div>');	
					   		$('.getPlateVal').tooltip('show');
					   		$('.getPlateVal').closest('div[class*="form-group"]').addClass('has-error');
					   		setTimeout($.proxy(function() { $('.getPlateVal').tooltip('hide'); }, this), 3000);
	    				}
	    			} 
	    		});
	    	}, this), 200);
	 });
}

function initiallizeMinLength(selector, minLength){
	$(selector).focusout(function(){
		applyTooltipWarning(selector);
		if($.trim($(selector).val()).length < minLength){
			$(this).data('isValid', false);
		} else{
			$(this).data('isValid', true);
		}
		setTimeout($.proxy(function() {  
			if($.trim($(selector).val()).length < minLength){
				$(selector).attr('data-original-title',
							   				'<div class="tooltip-icon"><span class="glyphicon glyphicon-asterisk"></span></div>' +
											'<div class="tooltip-content">Accepting Minimum of 4 characters!</div>');	
				$(selector).tooltip('show');
				$(selector).closest('div[class*="form-group"]').addClass('has-error');
				setTimeout($.proxy(function() { $(selector).tooltip('hide'); }, this), 3000);
			} else{
				$(selector).closest('div[class*="form-group"]').removeClass('has-error');	    
			}
		}, this), 200);
	});
}
