var $contactForm = $('#contact_form');
var $statusTink = $('#result');

$contactForm.submit(function(e) {
    e.preventDefault();
    var $submit = $('button:submit', $contactForm);
    var defaultSubmitText = $submit.val();

    $.ajax({
        url: '//formspree.io/taylorradtke@gmail.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        beforeSend: function() {
            $statusTink.append('<div class="alert alert--loading">Sending message…</div>');
            $submit.attr('disabled', true).val('Sending message…');
        },
        success: function(data) {
            $statusTink.append('<div class="alert alert--success">Message sent!</div>');
            $submit.val('Message sent!');
            $('.alert--loading').remove();
            setTimeout(function() {
                $('.alert--success').remove();
                $submit.attr('disabled', false).val(defaultSubmitText);
            }, 5000);
        },
        error: function(err) {
            $statusTink.find('.alert--loading').hide();
            $statusTink.append('<div class="alert alert--error">Ops, there was an error.</div>');
            $submit.val('Ops, there was an error.');
            setTimeout(function() {
                $('.alert--error').remove();
                $submit.attr('disabled', false).val(defaultSubmitText);
            }, 5000);
        }
    });
});