var data = {
    //link:'http://toupiao.snimay.com/index.php/',
    //imgLink:'http://toupiao.snimay.com/public',
    link:'http://127.0.0.1/snimay/',
    imgLink:'http://127.0.0.1/snimay/public',
    token:'',
    hasClick:true,
    adding:[],
};
var all = new Vue({
    el:'#vueMain',
    data:data,
    created:function() {
        var $this=this;
        $('#file_upload').on('click',function(){
            $this.uploads('#file_upload',function(res){
                $("#add1").hide();
                $("#upic").attr('src',$this.imgLink+res.thumb.pic);
                $("#user_pics").attr('value',res.thumb.pic_s);
                $("#user_pic").attr('value',res.thumb.pic);
            });
        });

        $('#file_upload_b').on('click',function(){
            $this.uploads('#file_upload_b',function(res){
                $("#add2").hide();
                $("#teamPic").attr('src',$this.imgLink+res.thumb.pic);
                $("#tool_pics").attr('value',res.thumb.pic_s);
                $("#tool_pic").attr('value',res.thumb.pic);
            });
        });
        $('#file_upload_c').on('click',function(){
            $this.uploads('#file_upload_c',function(res){
                $("#add3").hide();
                $("#sell_c").attr('src',$this.imgLink+res.thumb.pic);
                $("#owner_pics").attr('value',res.thumb.pic_s);
                $("#owner_pic").attr('value',res.thumb.pic);
            });
        });


    },
    methods: {
        AjaxL: function (url, type, data, call) {
            var $this = this;
            $.ajax({
                type: type,
                url: url,
                data: data,
                dataType: 'JSON',
                success: function (res) {
                    call(res);
                    if (res.token) {
                        $this.token = res.token;
                    }
                    if (res.url) {
                        window.location.href = res.url;
                    }
                },
            })
        },
        uploads:function(box,cal){
            var $this=this;
            layui.use('upload', function(){
                var upload = layui.upload;
                var uploadInst = upload.render({
                    elem: box //绑定元素
                    ,data:{"__token__":$this.token}
                    ,accept:"images"
                    ,size:3072
                    ,url: $this.link+"upload" //上传接口
                    ,before:function(){
                        index=layer.load(1);
                    }
                    ,done: function(res){
                        layer.closeAll();
                        $this.token=res.token;
                        if(res.code == 1){
                            cal(res);
                        }else{
                            layer.msg(res.msg);
                        }
                    }
                    ,error: function(){
                        layer.closeAll();
                    }
                });
            });
        },
        add_eng:function(){
            $("#eng").attr("disabled","disabled");
            var $this=this;
            var sell_name = $("#eng_sell").val();
            var username = $("#eng_name").val();
            var phone = $("#eng_phone").val();
            var serve_num = $("#eng_serve_num").val();
            var desc = "大家好,我是"+sell_name+"诗尼曼安装工程师"+username+"；今年累计服务客户"+serve_num+"家；争做2017诗尼曼“年度十优”榜样，我相信我能行！";
            var user_pic = $("#user_pic").val();
            var user_pics = $("#user_pics").val();
            var owner_pic = $("#owner_pic").val();
            var owner_pics = $("#owner_pics").val();
            var tool_pic = $("#tool_pic").val();
            var tool_pics = $("#tool_pics").val();
            var index=layer.load(1);
            $this.AjaxL($this.link+'addEngs','POST',{
                "sell_name":sell_name,
                "username":username,
                "phone":phone,
                "serve_num":serve_num,
                "user_pic":user_pic,
                "desc":desc,
                "user_pics":user_pics,
                "owner_pic":owner_pic,
                "owner_pics":owner_pics,
                "tool_pic":tool_pic,
                "tool_pics":tool_pics,
                "__token__":$this.token
            },function(res){
                layer.close(index);
                if(res.code == 1){
                    layer.msg(res.msg);
                }else{
                    $("#eng").removeAttr("disabled");
                    layer.msg(res.msg);
                }
            });
        },
    }
});