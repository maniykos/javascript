/*
 * @since      1.0.0
 * @package    reCaptcha
 * @author     oleg.l <oleg.l@wecandevelopit.com>
 *
 */

var mysitekey = 'you_site_key';
var myCallBack = function() {
    var recaptcha = jQuery('.re_captcha');  // get all recaptcha
    recaptcha.each(function() {
        grecaptcha.render(jQuery(this).attr('id'), {
            'sitekey' : mysitekey, //Replace this with your Site key
            'theme' : 'light'
        });
    });
};