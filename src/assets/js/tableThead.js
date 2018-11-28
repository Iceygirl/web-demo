// 表格的列数据

// 辖区管理列
export const areaTheads = [{
    title:'编号',
    key:'index',
    width:200,
    align:'center'
},{
    title:'所属管理处',
    key:'subArea',
    width:250,
    align:'center'
},{
    title:'管理员',
    key:'manager',
    minWidth:200,
    align:'center' 
},{
    title:'名称',
    key:'iName',
    minWidth:300,
    align:'center' 
},{ 
    title:'地址',
    key:'address',
    minWidth:300,
    align:'center'
},{
    title:'联系电话',
    key:'phone',
    width:300,
    align:'center'
}]


// 巡查员管理列
export const patrolmanTheads = [
{
    type: 'selection',
    width: 60,
    align: 'center'
},{
    title:'编号',
    key:'index',
    width:100, 
    align:'center'
},{
    title:'巡查员姓名',
    key:'name',
    width:200, 
    align:'center'
},{
    title:'巡查员帐号',
    key:'userName',
    width:120, 
    align:'center'
},{
    title:'联系电话',
    key:'phone',
    minWidth:200, 
    align:'center'
},{
    title:'身份证号码',
    key:'idCard',
    minWidth:260, 
    align:'center'
},{
    title:'所属管理处',
    key:'subArea',
    width:200, 
    align:'center'
},{
    title:'所属村居/社区',
    key:'iName',
    width:200, 
    align:'center'
}]