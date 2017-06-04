function formSubmitHelper(form, formNumber) {
	form
		.on('ajax:send', function(event, xhr) {
			$('#loading' + formNumber).show();
			$('#alert' + formNumber).hide('fast');
		})
		.on('ajax:complete', function(event, xhr, status) {
			$('#loading' + formNumber).hide();
		})
		.on('ajax:error', function(event, xhr, status) {
			var errors = '', response = $.parseJSON(xhr.responseText);
			$.each(response, function(i, obj) {
	        	errors += obj + '.<br />';
			});
			
			$('#alert_title' + formNumber).html('Saving failed');
			$('#alert_message' + formNumber).html(errors);
			$('#alert' + formNumber).attr('class', 'alert alert-danger');
			$('#alert' + formNumber).show('fast');
		})
		.on('ajax:success', function(event, data, status, xhr) {
			$('#alert_title' + formNumber).html('Saving has been successful');
			$('#alert_message' + formNumber).html('');
			$('#alert' + formNumber).attr('class', 'alert alert-success');
			$('#alert' + formNumber).show('fast');
			
			if(form.attr('id').match('new')) {
				form[0].reset();
			}
		});
}

function formSubmitHelper_forContent(form, formNumber) {
	form
		.on('ajax:send', function(event, xhr) {
			$('#loading' + formNumber).show();
			$('#result' + formNumber).hide('fast');
			$('#button' + formNumber).on('click', function() {
			  ga('send', 'event', 'button', 'click');
			});
		})
		.on('ajax:complete', function(event, xhr, status) {
			$('#loading' + formNumber).hide();
			$('#myModal' + formNumber).modal('show');
			var bdate = $('#calculate_premium_birthdate' + formNumber).val();
			$('.modal-bdate').val(bdate);
			$.post('/products/setSessionPlanId/' + $('#plan_id' + formNumber).val(), function(data){
				$('.change_planid').html(data);
			});	
		})
		.on('ajax:success', function(event, data, status, xhr) {
			$('#result' + formNumber).html(data);
			$('#result' + formNumber).show('fast');
			
			$('.package_plan_id').val(formNumber);
			$.post('/products/change_plans/' + formNumber, function(data){
				$('.change_plans').html(data);
			});
		});
}

function formSubmitHelper_forModalContent(modalForm, formNumber) {
	modalForm
		.on('ajax:send', function(event, xhr) {
			$('#loading' + formNumber).show();
			$('#result' + formNumber).hide('fast');
			$('#button' + formNumber).on('click', function() {
			  ga('send', 'event', 'button', 'click');
			});
		})
		.on('ajax:complete', function(event, xhr, status) {
			$('#loading' + formNumber).hide();
			$('#myModal' + formNumber).modal('show');
			var elem_id = $('.plan_plan_id').attr('id');
			$.post('/products/setSessionPlanId/' + $('#' + elem_id).val(), function(data){
				$('.change_planid').html(data);
			});
		})
		.on('ajax:success', function(event, data, status, xhr) {
			$('#result' + formNumber).html(data);
			$('#result' + formNumber).show('fast');
		});
}
function formRegisterHelper(form, formNumber) {
	form
		.on('ajax:send', function(event, xhr) {
			$('#loading' + formNumber).show();
			$('#alert' + formNumber).hide('fast');
		})
		.on('ajax:complete', function(event, xhr, status) {
			$('#loading' + formNumber).hide();
		})
		.on('ajax:error', function(event, xhr, status) {
			var errors = '', response = $.parseJSON(xhr.responseText);
			$.each(response, function(i, obj) {
	        	errors += obj + '.<br />';
			});
			
			$('#alert_title' + formNumber).html('Registration failed');
			$('#alert_message' + formNumber).html(errors);
			$('#alert' + formNumber).attr('class', 'alert alert-danger');
			$('#alert' + formNumber).show('fast');
		})
		.on('ajax:success', function(event, data, status, xhr) {
			$('#alert_title' + formNumber).html('Registration has been successfully completed!');
			$('#alert_message' + formNumber).html('');
			$('#alert' + formNumber).attr('class', 'alert alert-success');
			$('#alert' + formNumber).show('fast');
			
			if(form.attr('id').match('new')) {
				form[0].reset();
			}
		});
}