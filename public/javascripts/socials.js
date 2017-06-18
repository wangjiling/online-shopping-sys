
function Social() {
    this.initSocialDomainLike = function() {
        try {
            var domainUrl = getServerBaseUrl("/");
            // Facebook
            $("[name=fb_domain_like]").attr("data-href", domainUrl);

            // Twitter
            $("[name=tw_domain_like]").attr("data-url", domainUrl);

            // Google+
            $("[name=gp_domain_like]").attr("data-href", domainUrl);
        } catch(error) {
        }
    }
}

var social = new Social();

$(function() {
    social.initSocialDomainLike();
})

