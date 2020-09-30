var http = require("http");
var port = 3000;
var File = require("fs");
var Xu_ly_Tham_so = require('querystring');
var Luu_tru = require("./XL_Luu_tru_json.js");
var Du_lieu_Ung_dung = Khoi_dong_Du_lieu_Ung_dung();
var DV_Ban_dien_thoai = http.createServer(
    (Yeu_cau, Dap_ung) => {

        var Chuoi_Nhan = ""
        var Chuoi_Kq = ""
        var Dia_chi = Yeu_cau
            .url
            .replace("/", "")
        var Tham_so = Xu_ly_Tham_so.parse(Dia_chi)
        var Loai_Doi_tuong = Tham_so.Loai_Doi_tuong
        var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly
        var Ngay_Hien_hanh = new Date()
        Yeu_cau.on('data', (chunk) => { Chuoi_Nhan += chunk })
        Yeu_cau.on('end', () => {
            if (Ma_so_Xu_ly == "KHOI_DONG_DU_LIEU_KHACH_HANG") {
                var Du_lieu = JSON.parse(JSON.stringify(Du_lieu_Ung_dung))
                delete Du_lieu.Cong_ty[0].Quan_ly
                delete Du_lieu.Cong_ty[0].Nhan_vien_Nhap_hang
                delete Du_lieu.Cong_ty[0].Danh_sach_Nhan_vien_Ban_hang
                delete Du_lieu.Cong_ty[0].Danh_sach_Nhom_Dien_thoai
                delete Du_lieu.Cong_ty[0].Danh_sach_Nhan_vien_Giao_hang
                Du_lieu.Danh_sach_Dien_thoai.forEach(Dien_thoai => {
                    delete Dien_thoai.Danh_sach_Phieu_Ban
                    delete Dien_thoai.Danh_sach_Phieu_Dat
                    delete Dien_thoai.Danh_sach_Phieu_Nhap
                });

                Chuoi_Kq = JSON.stringify(Du_lieu);

            } else if (Ma_so_Xu_ly == "KHOI_DONG_DU_LIEU_NGUOI_DUNG") {
                var Du_lieu = {}
                Du_lieu.Cong_ty = Du_lieu_Ung_dung.Cong_ty
                Chuoi_Kq = JSON.stringify(Du_lieu)
                console.log(Chuoi_Kq)

            } else if (Ma_so_Xu_ly == "KHOI_DONG_DU_LIEU_CONG_TY") {

                var Du_lieu = JSON.parse(JSON.stringify(Du_lieu_Ung_dung.Cong_ty))
                delete Du_lieu[0].Quan_ly
                delete Du_lieu[0].Nhan_vien_Nhap_hang
                delete Du_lieu[0].Danh_sach_Nhan_vien_Ban_hang
                delete Du_lieu[0].Danh_sach_Nhom_Dien_thoai
                delete Du_lieu[0].Danh_sach_Nhan_vien_Giao_hang

                Chuoi_Kq = JSON.stringify(Du_lieu)

            } else if (Ma_so_Xu_ly == "KHOI_DONG_DU_LIEU_NHAN_VIEN") {

                var Du_lieu = {}
                Du_lieu.Danh_sach_Dien_thoai = Du_lieu_Ung_dung.Danh_sach_Dien_thoai
                Du_lieu.Thong_tin_Cua_hang = Du_lieu_Ung_dung.Cua_hang
                Du_lieu.Nhan_vien = Du_lieu_Ung_dung.Nhan_vien
                Chuoi_Kq = JSON.stringify(Du_lieu)

            } else if (Ma_so_Xu_ly == "KHOI_DONG_DU_LIEU_QUAN_LY") {
                var Du_lieu = JSON.parse(JSON.stringify(Du_lieu_Ung_dung))
                delete Du_lieu.Cong_ty[0].Quan_ly
                delete Du_lieu.Cong_ty[0].Nhan_vien_Nhap_hang
                delete Du_lieu.Cong_ty[0].Danh_sach_Nhan_vien_Ban_hang
                delete Du_lieu.Cong_ty[0].Danh_sach_Nhom_Dien_thoai
                delete Du_lieu.Cong_ty[0].Danh_sach_Nhan_vien_Giao_hang
                Du_lieu.Danh_sach_Dien_thoai.forEach(Dien_thoai => {
                    delete Dien_thoai.Danh_sach_Phieu_Ban
                    //delete Dien_thoai.Danh_sach_Phieu_Dat
                    delete Dien_thoai.Danh_sach_Phieu_Nhap
                });
                Chuoi_Kq = JSON.stringify(Du_lieu);

            } else if (Ma_so_Xu_ly == "CAP_NHAT_DIEN_THOAI") {
                var Dien_thoai = JSON.parse(Chuoi_Nhan)
                var Kq = Luu_tru.Cap_nhat_Doi_tuong("DIEN_THOAI", Dien_thoai)
                if (Kq == "") {
                    var Dien_thoai_Ung_dung = Du_lieu_Ung_dung.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai.Ma_so)
                    Dien_thoai_Ung_dung.Don_gia_Ban = Dien_thoai.Don_gia_Ban
                } else
                    Dien_thoai = {
                        'Ma_so_Loi': "LOI_CAP_NHAT"
                    }

                Chuoi_Kq = JSON.stringify(Dien_thoai)
            } else if (Ma_so_Xu_ly == "GHI_MOI_DIEN_THOAI") {
                var Dien_thoai = JSON.parse(Chuoi_Nhan)
                var Kq = Luu_tru.Ghi_moi_Doi_tuong("DIEN_THOAI", Dien_thoai)
                if (Kq == "") {
                    var Dien_thoai_Ung_dung = Du_lieu_Ung_dung.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai.Ma_so)
                    Du_lieu_Ung_dung.Danh_sach_Dien_thoai.push(Dien_thoai)
                } else
                    Dien_thoai = {
                        'Ma_so_Loi': "LOI_CAP_NHAT"
                    }
                Chuoi_Kq = JSON.stringify(Dien_thoai)
            } else if (Ma_so_Xu_ly == "XOA_DIEN_THOAI") {
                var Ma_so = Tham_so.Ma_so_Dien_thoai
                var Dien_thoai = Du_lieu_Ung_dung.Danh_sach_Dien_thoai.find(x => x.Ma_so == Ma_so)
                var Kq = Luu_tru.Xoa_Doi_tuong("DIEN_THOAI", Dien_thoai)
                    //Kq = "dfdsf";
                if (Kq == "") {
                    Du_lieu_Ung_dung.Danh_sach_Dien_thoai.forEach((Dien_thoai, index) => {
                        if (Dien_thoai.Ma_so == Ma_so) {
                            Du_lieu_Ung_dung.Danh_sach_Dien_thoai.splice(index, 1)
                        }
                    })
                    Dien_thoai = Du_lieu_Ung_dung
                } else {
                    Dien_thoai = {
                        'Ma_so_Loi': "LOI_XOA"
                    }
                }

                Chuoi_Kq = JSON.stringify(Dien_thoai)
            } else if (Ma_so_Xu_ly == "CAP_NHAT_GIAO_HANG") {
                var Dien_thoai = JSON.parse(Chuoi_Nhan)
                var Kq = Luu_tru.Cap_nhat_Doi_tuong("DIEN_THOAI", Dien_thoai)
                if (Kq == "") {
                    var Dien_thoai_Ung_dung = Du_lieu_Ung_dung.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai.Ma_so)
                    Dien_thoai_Ung_dung.Danh_sach_Phieu_Dat_hang = Dien_thoai.Danh_sach_Phieu_Dat_hang

                } else
                    Dien_thoai = {
                        'Ma_so_Loi': "LOI_CAP_NHAT"
                    }

                Chuoi_Kq = JSON.stringify(Dien_thoai)
            } else if (Ma_so_Xu_ly == "THEM_PHIEU_DAT_HANG") {
                var Dien_thoai = JSON.parse(Chuoi_Nhan)
                var Kq = Luu_tru.Cap_nhat_Doi_tuong("DIEN_THOAI", Dien_thoai)
                if (Kq == "") {
                    var Dien_thoai_Ung_dung = Du_lieu_Ung_dung.Danh_sach_Dien_thoai.find(x => x.Ma_so == Dien_thoai.Ma_so)
                    Dien_thoai_Ung_dung.Danh_sach_Phieu_Dat_hang = Dien_thoai.Danh_sach_Phieu_Dat_hang

                } else {
                    Dien_thoai = {
                        'Ma_so_Loi': "LOI_CAP_NHAT"
                    }
                    Chuoi_Kq = JSON.stringify(Dien_thoai)
                }


            }
            Dap_ung.setHeader("Access-Control-Allow-Origin", '*')
            Dap_ung.end(Chuoi_Kq);
        })

    })

DV_Ban_dien_thoai.listen(port);

function Khoi_dong_Du_lieu_Ung_dung() {
    var Loai_Doi_tuong = "Dien_thoai"
    var Du_lieu = {}
    Du_lieu.Danh_sach_Dien_thoai = Luu_tru.Doc_Danh_sach(Loai_Doi_tuong);
    File.writeFileSync("./dien_thoai.json", JSON.stringify(Du_lieu.Danh_sach_Dien_thoai));
    Loai_Doi_tuong = "Cong_ty";
    Du_lieu.Cong_ty = Luu_tru.Doc_Danh_sach(Loai_Doi_tuong);
    File.writeFileSync("./cong_ty.json", JSON.stringify(Du_lieu.Cong_ty));
    return Du_lieu;
}