<?php
/*
    按发布数据逆序显示新闻列表
    请求参数：请求的页码，默认为1
    输出结果：
    {
    totalRecord://总条数
    pageSize://每页显示的条数
    pageCount://总页数
    pageNum://请求的页码
    data:[{},{}]//数据
    }
*/
require('init.php');
//每页显示的条数
$output['pageSize']=5;
//获取请求的页码
@$pageNum=$_REQUEST['pageNum'] or $pageNum=1;
$output['pageNum']=intval($pageNum);
//获取总条数
$sql="SELECT COUNT(*) FROM mf_news";
$result=mysqli_query($conn,$sql);
$output['totalRecord']=intval(mysqli_fetch_row($result)[0]);
//获取总页数
$output['pageCount']=ceil($output['totalRecord']/$output['pageSize']);
//获取指定页中的数据
$start=($output['pageNum']-1)*$output['pageSize'];
$count=$output['pageSize'];
$sql="SELECT * FROM mf_news ORDER BY pubTime DESC LIMIT $start,$count";
$result=mysqli_query($conn,$sql);
$output['data']=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($output);



