class XL_DU_LIEU {

    static Khoi_dong_Du_lieu(Ham_Xu_ly_Sau_khi_Khoi_dong) {
        var Chuoi_Tham_so = "Ma_so_Xu_ly=KHOI_DONG_DU_LIEU_NGUOI_DUNG"
        Kich_Hoat_Xu_ly_JSON(Chuoi_Tham_so, "",
            (Du_lieu) => {
                Ham_Xu_ly_Sau_khi_Khoi_dong(Du_lieu)
            })

    }

}

class XL_NGUOI_DUNG {

    static Kiem_tra_Thong_Tin(Ten_Dang_nhap, Mat_khau, Danh_sach_Nguoi_dung, Vai_tro) {
        var url = ""
        var Nguoi_dung
            //console.log(Danh_sach_Nguoi_dung.Danh_sach_Nhan_vien_Ban_hang)
        switch (parseInt(Vai_tro)) {
            case 1:
                Nguoi_dung = (Danh_sach_Nguoi_dung.Quan_ly.Ten_Dang_nhap.toUpperCase() ==
                    Ten_Dang_nhap.toUpperCase() && Danh_sach_Nguoi_dung.Quan_ly.Mat_khau.toUpperCase() ==
                    Mat_khau.toUpperCase())
                if (Nguoi_dung) {
                    url = "../Giao_dien_Quan_ly/MH_Chinh.html"
                    localStorage.setItem("NGUOI_DUNG", JSON.stringify(Danh_sach_Nguoi_dung.Quan_ly))
                }
                break
            case 2:
                Nguoi_dung = (Danh_sach_Nguoi_dung.Nhan_vien_Nhap_hang.Ten_Dang_nhap.toUpperCase() ==
                    Ten_Dang_nhap.toUpperCase() && Danh_sach_Nguoi_dung.Nhan_vien_Nhap_hang.Mat_khau.toUpperCase() ==
                    Mat_khau.toUpperCase())
                if (Nguoi_dung) {
                    url = "Nhập hàng"
                }
                break
            case 3:
                Nguoi_dung = Danh_sach_Nguoi_dung.Danh_sach_Nhan_vien_Ban_hang.find(x => x.Ten_Dang_nhap.toUpperCase() ==
                    Ten_Dang_nhap.toUpperCase() && x.Mat_khau.toUpperCase() ==
                    Mat_khau.toUpperCase())
                if (Nguoi_dung) {
                    url = "Bán hàng"
                }
                break
            case 4:
                Nguoi_dung = Danh_sach_Nguoi_dung.Danh_sach_Nhan_vien_Giao_hang.find(x => x.Ten_Dang_nhap.toUpperCase() ==
                    Ten_Dang_nhap.toUpperCase() && x.Mat_khau.toUpperCase() ==
                    Mat_khau.toUpperCase())
                if (Nguoi_dung) {
                    url = "Giao hàng"
                }
                break
        }
        return url
    }

}
class XL_CONG_TY {

    static Tao_The_hien(Thong_tin, Th_Cong_ty, Th_Cuoi_trang) {
        var The_hien = document.createElement("div")
        Th_Cong_ty.appendChild(The_hien)
        var noi_dung_dau = "";
        noi_dung_dau += '<img class="img-responsive pull-left" width="120px" src="../images/' + Thong_tin.Ma_so + '.png" />'
        noi_dung_dau += '<h2 class="pull-left">' + Thong_tin.Ten + '</h2>'
        noi_dung_dau += '<h4 class="text-info badge pull-right">Điện thoại: ' + Thong_tin.Dien_thoai
        noi_dung_dau += '<br>Email: ' + Thong_tin.Mail;
        noi_dung_dau += '<br>Địa chỉ: ' + Thong_tin.Dia_chi;
        noi_dung_dau += '</h4>';
        The_hien.innerHTML = noi_dung_dau;
        The_hien = document.createElement("div")
        Th_Cuoi_trang.appendChild(The_hien)
        noi_dung_dau = "" + '<span>' + Thong_tin.footer + '</span>'
        The_hien.innerHTML = noi_dung_dau;
        return The_hien;
    }
    
}