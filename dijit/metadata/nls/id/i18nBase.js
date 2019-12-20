// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.31/esri/copyright.txt for details.

define({general:{cancel:"Batal",close:"Tutup",none:"Tidak ada",ok:"Ya",other:"Lainnya",stamp:"Stampel",now:"Sekarang",choose:"Pilih Satu:"},editor:{noMetadata:"Tidak ada metadata untuk item ini.",xmlViewOnly:"Tipe metadata yang terkait dengan item ini tidak didukung oleh editor. Metadata harus dalam format ArcGIS.",editorDialog:{caption:"Metadata",captionPattern:"Metadata untuk {title}"},primaryToolbar:{view:"Tampilan",viewXml:"Lihat XML",edit:"Edit",initializing:"Memuat...",startingEditor:"Memulai editor...",loadingDocument:"Memuat dokumen...",updatingDocument:"Memperbarui dokumen...",generatingView:"Menciptakan tampilan...",errors:{errorGeneratingView:"Muncul kesalahan saat membuat tampilan.",errorLoadingDocument:"Muncul kesalahan saat memuat dokumen."}},changesNotSaved:{prompt:"Dokumen Anda memiliki perubahan yang belum disimpan.",dialogTitle:"Tutup Editor Metadata",closeButton:"Tutup"},download:{caption:"Unduhan",dialogTitle:"Unduhan",prompt:"Klik di sini untuk mengunduh file Anda."},load:{caption:"Buka",dialogTitle:"Buka",typeTab:"Dokumen Baru",fileTab:"Buka File",templateTab:"Template",itemTab:"Item Anda",filePrompt:"Pilih file XML Metadata ArcGIS lokal. Metadata harus dalam format ArcGIS.",templatePrompt:"Buat Metadata",pullItem:"Isi metadata dengan detail item.",importWarning:"File yang dipilih nampaknya bukan dalam format ArcGIS. Metadata yang diunggah harus dalam format ArcGIS.",loading:"Memuat...",noMetadata:"Metadata dapat dibuat untuk item ini dengan memilih salah satu dari opsi berikut.",unrecognizedMetadata:"Tipe metadata yang terkait dengan item ini tidak didukung oleh editor. Metadata yang didukung dapat dibuat dengan memilih salah satu opsi sebagai berikut.",errorLoading:"Terjadi kesalahan saat memuat.",warnings:{badFile:"File yang dipilih tidak dapat dimuat.",notAnXml:"File yang dipilih bukan file XML.",notSupported:"Tipe file ini tidak didukung."},portalCaption:"Timpa"},save:{caption:"Simpan",dialogTitle:"Simpan Metadata",working:"Menyimpan metadata...",errorSaving:"Ada kesalahan, metadata Anda tidak disimpan.",saveDialog:{pushCaption:"Terapkan perubahan pada item Anda"}},saveAndClose:{caption:"Simpan & Tutup"},saveDraft:{caption:"Unduh",dialogTitle:"Unduh"},validate:{caption:"Validasi",dialogTitle:"Validasi",docIsValid:"Dokumen Anda tidak valid."},viewHtml:{caption:"Tampilkan",dialogTitle:"Lihat Metadata",savePrompt:"Dokumen Anda memiliki perubahan yang belum disimpan. Anda harus menyimpan setiap perubahan agar terlihat saat menampilkan metadata.",saveButton:"Simpan dan Lihat",portalNone:"Metadata berbasis standar belum ditulis. Anda terlebih dahulu harus menyimpan sebelum dapat melihat metadata."},del:{caption:"Hapus",dialogTitle:"Hapus Metadata",prompt:"Apakah Anda yakin ingin menghapus metadata ini?",working:"Menghapus metadata...",errorDeleting:"Ada kesalahan, metadata Anda tidak dihapus.",portalNone:"Tidak ada dokumen metadata yang tersedia untuk dihapus. Metadata berbasis standar belum ditulis.",portalPrompt:"Ini akan menghapus dokumen metadata dan mengatur ulang metadata item menjadi informasi item seperti Judul, Deskripsi, dll.",portalPrompt2:"Ini akan menghapus metadata berbasis standar. Apakah Anda yakin ingin menghapus metadata ini?",portalButton:"Hapus dan Tutup"},transform:{caption:"Transformasikan",dialogTitle:"Transformasikan Ke",prompt:"",working:"Mengubah bentuk...",errorTransforming:"Muncul kesalahan saat mengubah dokumen Anda."},errorDialog:{dialogTitle:"Terjadi kesalahan"}},arcgis:{portal:{metadataButton:{caption:"Metadata"}}},calendar:{button:"Kalender...",title:"Kalender"},geoExtent:{button:"Atur Jangkauan Geografis...",title:"Jangkauan Geografis",navigate:"Navigasi",draw:"Gambar Persegi panjang",drawHint:"Tekan bawah untuk memulai dan lepaskan untuk selesaikan."},hints:{date:"(tttt atau tttt-bb atau tttt-bb-hh)",dateTime:"(tttt-bb-hhTjj:mm:dd.ddd[+-]jj:mm)",dateOrDateTime:"(tttt atau tttt-bb atau tttt-bb-hh atau (tttt-bb-hhTjj:mm:dd.ddd[+-]jj:mm)",delimitedTextArea:"(gunakan koma atau garis baru sebagai pemisah)",fgdcDate:"(tttt atau tttt-bb atau tttt-bb-hh)",fgdcTime:"(jj:mm:dd.ddd[+-]jj:mm)",integer:"(masukkan bilangan bulat)",latitude:"(derajat desimal)",longitude:"(derajat desimal)",number:"(masukkan angka)",numberGreaterThanZero:"(masukkan angka > 0)"},isoTopicCategoryCode:{caption:"Kategori Topik",boundaries:"Batas Administratif dan Politis",farming:"Agrikultur dan Pertanian",climatologyMeteorologyAtmosphere:"Atmosfir dan Iklim",biota:"Biologi dan Ekologi",economy:"Bisnis dan Ekonomi",planningCadastre:"Kadastral",society:"Kebudayaan, Sosial, dan Demografi",elevation:"Elevasi dan Produk Turunan",environment:"Lingkungan dan Konservasi",structure:"Fasilitas dan Struktur",geoscientificInformation:"Geologis dan Geofisika",health:"Kesehatan dan Penyakit Manusia",imageryBaseMapsEarthCover:"Pencitraan dan Peta Dasar",inlandWaters:"Sumber daya Perairan Darat",location:"Lokasi dan Jaringan Geodesi",intelligenceMilitary:"Militer",oceans:"Samudera dan Estuari",transportation:"Jaringan Transportasi",utilitiesCommunication:"Utilitas dan Komunikasi"},multiplicity:{moveElementDown:"Pindahkan Bagian Ke Bawah",moveElementUp:"Pindahkan Bagian Ke Atas",removeElement:"Hapus Bagian",repeatElement:"Ulangi Bagian"},optionalNode:{switchTip:"Masukkan atau kecualikan bagian ini"},serviceTypes:{featureService:"Feature Service",mapService:"Map Service",imageService:"Layanan Gambar",wms:"WMS",wfs:"WFS",wcs:"WCS"},validation:{pattern:"{label} - {pesan}",patternWithHint:"{label} - {pesan} {hint}",ok:"Ya",empty:"Diperlukan nilai.",date:"Nilai harus berupa tanggal.",integer:"Nilai harus berupa bilangan bulat.",number:"Nilai harus berupa angka.",other:"Nilai tak sah."},validationPane:{clearMessages:"Hapus Pesan",prompt:"(klik pada setiap pesan di bawah dan berikan informasi yang diminta pada kolom yang ditentukan)"}});