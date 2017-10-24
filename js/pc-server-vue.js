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
        $this.AjaxL($this.link+'hasAuths','GET',false,function(res){
            $this.token=res.token;
        });
        layui.use('layer', function(){
            var layer=layui.layer;
        });
        $('#file_upload').on('click',function(){
            //$this.uploads('#file_upload',function(res){
            //    $("#add1").hide();
            //    $("#upic").attr('src',$this.imgLink+res.thumb.pic);
            //    $("#user_pics").attr('value',res.thumb.pic_s);
            //    $("#user_pic").attr('value',res.thumb.pic);
            //});
            $this.upBase('file_upload',function(res){
                $("#add1").hide();
                $("#upic").attr('src',res);
                //$("#user_pics").attr('value',res.substr(22));
                $("#user_pic").attr('value',res.substr(22));
            });
        });

        //执行实例
        var token=$this.token;
        layui.use('upload', function(){
            var upload = layui.upload;
            var uploadInst = upload.render({
                elem: '#file_upload_v' //绑定元素
                ,data:{"__token__":token}
                ,accept:'video'
                ,size:20480
                ,url: $this.link+"uploads" //上传接口
                ,before:function(){
                    index=layer.load(1);
                }
                ,done: function(res){
                    layer.closeAll();
                    $this.token=res.token;
                    if(res.code == 1){
                        $("#add2").hide();
                        $("#vpic").hide();
                        $("#pic2").show();
                        $("#pic2").attr('src',res.thumb.pic);
                        $("#vido").attr('value',res.thumb.pic);
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
        upBase:function(id,call){
            var $this=this;
            var _upFile=document.getElementById(id);
            index=layer.load(1);
            _upFile.addEventListener("change",function(){
                if (_upFile.files.length === 0) {
                    alert("请选择图片");
                    return; }
                var oFile = _upFile.files[0];
                //if (!rFilter.test(oFile.type)) { alert("You must select a valid image file!"); return; }

                /*  if(oFile.size>5*1024*1024){
                 message(myCache.par.lang,{cn:"照片上传：文件不能超过5MB!请使用容量更小的照片。",en:"证书上传：文件不能超过100K!"})
                 return;
                 }*/
                if(!new RegExp("(jpg|jpeg|png)+","gi").test(oFile.type)){
                    alert("照片上传：文件类型必须是JPG、JPEG、PNG");
                    return;
                }
                //layer.load(2);
                var reader = new FileReader();
                reader.onload = function(e) {
                    var base64Img= e.target.result;
                    //压缩前预览
                    //--执行resize。
                    var _ir=ImageResizer({
                        resizeMode:"auto"
                        ,dataSource:base64Img
                        ,dataSourceType:"base64"
                        ,maxWidth:714 //允许的最大宽度
                        ,maxHeight:1334 //允许的最大高度。
                        ,onTmpImgGenerate:function(img){
                        }
                        ,success:function(resizeImgBase64,canvas){
                            layer.closeAll();
                            call(resizeImgBase64);
                            //赋值到隐藏域传给后台
                            // $('#imgOne').val(resizeImgBase64.substr(22));
                        }
                        ,debug:true
                    });

                };
                layer.closeAll();
                reader.readAsDataURL(oFile);
            },false);
        },
        add_adv:function(){
            $("#adv").attr("disabled","disabled");
            var $this=this;
            var sell_name = $("#adv_sell").val();
            var username = $("#adv_name").val();
            var phone = $("#adv_phone").val();
            var works = $("#adv_works").val();
            var money = $("#adv_money").val();
            var desc = "大家好,我是"+sell_name+"诗尼曼家居顾问"+username+"；今年累计签单"+works+"笔，总签单金额"+money+"；争做2017诗尼曼“年度十优”榜样，我相信我能行！";
            var user_pic = $("#user_pic").val();
            var video = $("#vido").val();
            var index=layer.load(1);
            $this.AjaxL($this.link+'addSers','POST',{
                "sell_name":sell_name,
                "username":username,
                "phone":phone,
                "user_pic":user_pic,
                "desc":desc,
                "works":works,
                "money":money,
                "video":video,
                "__token__":$this.token
            },function(res){
                layer.close(index);
                if(res.code == 1){
                    layer.msg(res.msg);
                    $("#wechat").show();
                }else{
                    $("#adv").removeAttr("disabled");
                    layer.msg(res.msg);
                }
            });
        },
    }
});