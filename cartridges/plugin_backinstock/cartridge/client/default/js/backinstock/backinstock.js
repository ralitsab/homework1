'use strict';

module.exports = {
    subscribe: function () {
        $('#twillio').on('submit', function (e) {
            e.preventDefault();
            var data =  $(this).serialize();
            $(this).spinner().start()
            $.ajax({
                url: $(this).attr('action'),
                type: 'post',
                dataType: 'json',
                data: data,
                success: function (data) {
                    $(this).spinner().stop();
                },
                error: function (err) {
                    $(this).spinner().stop();
                }
            });
        })
    }
};
