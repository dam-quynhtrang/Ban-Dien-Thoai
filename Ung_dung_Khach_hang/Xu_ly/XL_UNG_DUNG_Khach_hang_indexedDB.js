class XL_DU_LIEU {

    static Khoi_dong_Du_lieu(Ham_Xu_ly_Sau_khi_Khoi_dong) {
        var Chuoi_Tham_so = "Ma_so_Xu_ly=KHOI_DONG_DU_LIEU_KHACH_HANG"
        Kich_Hoat_Xu_ly_JSON(Chuoi_Tham_so, "",
            (Du_lieu) => {
                Ham_Xu_ly_Sau_khi_Khoi_dong(Du_lieu)
            })

    }
    static Them_Phieu_Dat_hang(Dien_thoai) {
        var Chuoi_Tham_so = "Ma_so_Xu_ly=THEM_PHIEU_DAT_HANG"
        var Chuoi_Goi = JSON.stringify(Dien_thoai)
        Kich_Hoat_Xu_ly_JSON(Chuoi_Tham_so, Chuoi_Goi, (Doi_tuong) => {
            if (Doi_tuong.Ma_so_Loi) {
                localStorage.Ma_so_Loi = Doi_tuong.Ma_so_Loi
                location.href = "MH_Loi_He_thong.html"
            }

        })

    }


}

class XL_DIEN_THOAI {

    static Tao_The_hien(Dien_thoai, Th_Cha) {
        var The_hien = document.createElement("div")
        Th_Cha.appendChild(The_hien)
        var noi_dung = "";
        if (Dien_thoai.So_luong_Con_lai == 0) {
            var lbl = '&nbsp;<lable class="label label-danger">Hết hàng</lable>'
        } else {
            var lbl = '&nbsp;<lable class="label label-success">Còn hàng</lable>'
        }
        noi_dung += '<div class="col-xs-12 col-sm-4 col-md-3">'
        noi_dung += '<div class="thumbnail">'
        noi_dung += '<img src="..//images//Dien_thoai//' + Dien_thoai.Ma_so + '.png" alt="" class="img-responsive" style="width:90%">'
        noi_dung += '<div class="caption">'
        noi_dung += '<div class="text-primary">' + Dien_thoai.Ten + '</div>'
        noi_dung += '<span class="text-danger">Giá:' + Tao_Chuoi_The_hien_So_thuc_duong(Dien_thoai.Don_gia_Ban, 0) + 'đ</span>'
        noi_dung += lbl
        noi_dung += '</div></div></div>'
        The_hien.innerHTML = noi_dung;
        return The_hien;
    }
    static Tao_The_hien_Gio_hang(Dien_thoai, Th_Cha) {
        var The_hien = document.createElement("tr");
        var noi_dung = "";
        Th_Cha.appendChild(The_hien)
        noi_dung += '<td><img src="..//images//Dien_thoai//' + Dien_thoai.Ma_so + '.png" alt="" class="img-responsive" style="width:80px"></td>'
        noi_dung += '<td><input type="hidden" name="Th_Ma_so" value="' + Dien_thoai.Ma_so + '" />' + Dien_thoai.Ten + '</td>'
        noi_dung += '<td>' + Dien_thoai.Nhom_Dien_thoai.Ten + '</td>'
        noi_dung += '<td>' + Tao_Chuoi_The_hien_So_thuc_duong(Dien_thoai.Don_gia_Ban, 0) + 'đ</td>'
        noi_dung += '<td><input type="number" name="Th_So_luong" value="1" min=1 max=10 Ma_so="' + Dien_thoai.Ma_so + '" /></td>'
        noi_dung += '<td><input type="checkbox" name="Th_Xoa_Dien_thoai" value="' + Dien_thoai.Ma_so + '" /></td>'
        The_hien.innerHTML = noi_dung;
        return The_hien;
    }
}