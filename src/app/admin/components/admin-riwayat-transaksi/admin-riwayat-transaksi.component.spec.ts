import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRiwayatTransaksiComponent } from './admin-riwayat-transaksi.component';

describe('AdminRiwayatTransaksiComponent', () => {
  let component: AdminRiwayatTransaksiComponent;
  let fixture: ComponentFixture<AdminRiwayatTransaksiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRiwayatTransaksiComponent]
    });
    fixture = TestBed.createComponent(AdminRiwayatTransaksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
