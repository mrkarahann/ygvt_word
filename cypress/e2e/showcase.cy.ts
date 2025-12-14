// Removed unresolved reference directive
declare const describe: any;
declare const beforeEach: any;
declare const it: any;
declare const cy: any;

describe('AI Writer Pro Demo Showcase', () => {
  
  beforeEach(() => {
    // Uygulamayı başlat
    cy.visit('/');
  });

  it('Complete User Journey: Dashboard -> Editor -> AI -> Settings', () => {
    // 1. Dashboard Kontrolleri
    cy.contains('Hoş geldin, Ahmet').should('be.visible');
    cy.contains('Bugün ne üzerinde çalışmak istersin?').should('be.visible');
    
    // Görsel zenginliği göstermek için biraz bekle
    cy.wait(1000);

    // 2. Editöre Geçiş (Yeni Belge)
    cy.contains('Yeni Belge').click();
    cy.url().should('include', '/editor');
    
    // Editörün yüklendiğini doğrula
    cy.contains('Q3 Pazarlama Raporu').should('be.visible');
    
    // 3. Yazı Yazma Simülasyonu
    cy.get('.editor-content')
      .focus()
      .type('{enter}{enter}## Gelecek Planları{enter}Yapay zeka entegrasyonu ile verimliliğimizi %200 artırmayı hedefliyoruz.');
    
    cy.wait(1000);

    // 4. AI Asistanını Açma
    cy.get('button').find('.material-symbols-outlined').contains('smart_toy').click();
    cy.contains('AI Asistanı').should('be.visible');
    
    // AI'ya komut gönderme
    cy.get('textarea[placeholder="AI\'ya komut ver..."]')
      .type('Bu metni daha profesyonel hale getir.{enter}');
    
    cy.wait(1500); // Sanki AI düşünüyormuş gibi bekle
    
    // AI penceresini kapat
    cy.contains('AI Asistanı').parent().find('button').click();

    // 5. Ayarlar Menüsü (Modal)
    cy.contains('Ayarlar').click();
    cy.contains('Belge Ayarları').should('be.visible');
    cy.wait(1000);
    cy.contains('İptal').click();

    // 6. Geri Dönüş ve Sidebar Navigasyon
    cy.get('a[href="#/"]').first().click(); // Geri butonu
    
    // Dosyalarım Sayfası
    cy.get('a[href="#/documents"]').click();
    cy.contains('Dosyalarım').should('be.visible');
    cy.wait(800);

    // Marketplace Sayfası
    cy.get('a[href="#/marketplace"]').click();
    cy.contains('Marketplace').should('be.visible');
    cy.wait(800);

    // 7. Dark Mode Testi (Ayarlar Sayfası)
    cy.get('a[href="#/settings"]').click();
    cy.contains('Görünüm').should('be.visible');
    
    // Light Mode'a geç
    cy.contains('Açık').click();
    cy.get('html').should('not.have.class', 'dark');
    cy.wait(1000);
    
    // Dark Mode'a geri dön
    cy.contains('Koyu').click();
    cy.get('html').should('have.class', 'dark');
  });
});