let data=[];
let dataStr='1.任天堂是世界的猪仔<br/>2.任天堂是世界的猪仔<br/>3.任天堂是世界的猪仔<br/>4.任天堂是世界的猪仔<br/>5.任天堂是世界的猪仔<br/>6.任天堂是世界的猪仔<br/>7.任天堂是世界的猪仔<br/>8.任天堂是世界的猪仔<br/>9.任天堂是世界的猪仔<br/>10.任天堂是世界的猪仔<br/>11.任天堂是世界的猪仔<br/>12.任天堂是世界的猪仔<br/>13.任天堂是世界的猪仔<br/>14.任天堂是世界的猪仔<br/>15.任天堂是世界的猪仔<br/>16.任天堂是世界的猪仔<br/>17.任天堂是世界的猪仔<br/>18.任天堂是世界的猪仔<br/>19.任天堂是世界的猪仔<br/>20.任天堂是世界的猪仔';

let d = dataStr.split('<br/>');
for(let i=0;i<d.length;i++){
    let c = d[i].split('.');
    data.push({
            img:c[0]+'.jpg',
            caption:'塞尔达传说',
            desc:c[1]
        });
    // console.log(c[0]+'.jpg');
};
