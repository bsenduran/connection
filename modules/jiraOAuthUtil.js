var api = {};
(function () {
    var provider = {
        "authorizeUrl": "https://jira.atlassian.com/plugins/servlet/oauth/authorize",
        "accessTokenUrl": "http://localhost:8080/plugins/servlet/oauth/access-token",
        "callbackUrl": "https://www.google.lk/",
        "requestTokenUrl": "http://localhost:8080/plugins/servlet/oauth/request-token",
        "signatureMethod": "RSA-SHA1",
        "consumerKey": "publisher",
        "rsaPublicKey": "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0YjCwIfYoprq/FQO6lb3asXrxLlJFuCvtinTF5p0GxvQGu5O3gYytUvtC2JlYzypSRjVxwxrsuRcP3e641SdASwfrmzyvIgP08N4S0IFzEURkV1wp/IpH7kH41EtbmUmrXSwfNZsnQRE5SYSOhh+LcK2wyQkdgcMv11l4KoBkcwIDAQAB-----END PUBLIC KEY-----",
        "rsaPrivateKey": "-----BEGIN PRIVATE KEY-----MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALRiMLAh9iimur8VA7qVvdqxevEuUkW4K+2KdMXmnQbG9Aa7k7eBjK1S+0LYmVjPKlJGNXHDGuy5Fw/d7rjVJ0BLB+ubPK8iA/Tw3hLQgXMRRGRXXCn8ikfuQfjUS1uZSatdLB81mydBETlJhI6GH4twrbDJCR2Bwy/XWXgqgGRzAgMBAAECgYBYWVtleUzavkbrPjy0T5FMou8HX9u2AC2ry8vD/l7cqedtwMPp9k7TubgNFo+NGvKsl2ynyprOZR1xjQ7WgrgVB+mmuScOM/5HVceFuGRDhYTCObE+y1kxRloNYXnx3ei1zbeYLPCHdhxRYW7T0qcynNmwrn05/KO2RLjgQNalsQJBANeA3Q4Nugqy4QBUCEC09SqylT2K9FrrItqL2QKc9v0ZzO2uwllCbg0dwpVuYPYXYvikNHHg+aCWF+VXsb9rpPsCQQDWR9TT4ORdzoj+NccnqkMsDmzt0EfNaAOwHOmVJ2RVBspPcxt5iN4HI7HNeG6U5YsFBb+/GZbgfBT3kpNGWPTpAkBI+gFhjfJvRw38n3g/+UeAkwMI2TJQS4n8+hid0uus3/zOjDySH3XHCUnocn1xOJAyZODBo47E+67R4jV1/gzbAkEAklJaspRPXP877NssM5nAZMU0/O/NGCZ+3jPgDUno6WbJn5cqm8MqWhW1xGkImgRk+fkDBquiq4gPiT898jusgQJAd5Zrr6Q8AO/0isr/3aa6O6NLQxISLKcPDk2NOccAfS/xOtfOz4sJYM3+Bs4Io9+dZGSDCA54Lw03eHTNQghS0A==-----END PRIVATE KEY-----"
    };

    api.getJiraProviderConfig = function () {
        return provider;
    }

    api.getRedirectUrl = function(){
        return provider.callbackUrl;
    }
    api.getAccessTokenUrl = function () {
        return provider.accessTokenUrl;
    }

    api.getAuthorizeUrl = function(){
        return provider.authorizeUrl;
    }
    
    api.getRequestTokenUrl = function () {
        return provider.requestTokenUrl;
    }

    api.getConsumerKey = function(){
        return provider.consumerKey;
    }

    api.getPrivateKey = function(){
        return provider.rsaPrivateKey;
    }

}());