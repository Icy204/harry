#!/usr/bin/env bash
cat << "EOF"

  _____             _           _        _ _ 
 |_   _|           (_)         | |      | | |
   | |  ___ _   _   _ _ __  ___| |_ __ _| | |
   | | / __| | | | | | '_ \/ __| __/ _` | | |
  _| || (__| |_| | | | | | \__ \ || (_| | | |
 |_____\___|\__, | |_|_| |_|___/\__\__,_|_|_|
             __/ |                           
            |___/                            

Special thanks to:
  Trần Xuân Thanh(ging-dev) for termux-manager.
  Phạm Quang Huy(huybopbi) for contribute this method.

===============================================
Installation file made by icy with love <3
GITHUB: icy
THIS BOT MAKE FOR ONLY VIETNAMESE USER, IF YOU WANT TO USE THIS PLEASE CONTACT ME
IcyProject LÀ MÃ NGUỒN MỞ, HOÀN TOÀN KHÔNG ĐƯỢC BUÔN BÁN Ở BẤT CỨ NƠI NÀO, HÃY CẨN THẬN!
LƯU Ý: SHELL SCRIPT NÀY CHỈ DÀNH CHO TERMUX!
Để hệ thống hoạt động tối ưu, ít nhất dung lượng máy phải trống khoảng 1-2GB.
Nhấn enter để bắt đầu tiến hành cài đặt.

EOF
read

echo "==============================================="
echo "[!] Tiến hành cài đặt các gói library còn thiếu [!]"
pkg install -y libpixman libcairo pango xorgproto php libjpeg-turbo-progs libjpeg-turbo-static libjpeg-turbo librsvg nodejs git python wget

git clone https://github.com/GinzaTech/miraiv2
cd miraiv2
echo "[!] Đã tải source code thành công, tiến hành cài các gói cần thiết [!]"
npm install
echo "[!] Đã cài các gói cần thiết thành công, tiến hành cài đặt file manager [!]"
bash <(wget -qO- https://raw.githubusercontent.com/catalizcs/storage-data/master/install-fmanager.sh)
echo "[!] Đã cài đặt file manager thành công [!]"

echo "==============================================="
echo "Cài đặt hoàn tất! Hãy sửa file config.json, thêm appstate ở cửa sổ sau."
echo "Toàn bộ thư mục của bot được lưu tại '/home/miraiv2'"
echo "Nhấn enter để mở file manager."
read

manager
