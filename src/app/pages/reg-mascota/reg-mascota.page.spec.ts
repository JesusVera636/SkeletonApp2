import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegMascotaPage } from './reg-mascota.page';

describe('RegMascotaPage', () => {
  let component: RegMascotaPage;
  let fixture: ComponentFixture<RegMascotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegMascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
