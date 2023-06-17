import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';

import { Router, NavigationEnd } from '@angular/router';
import { SubmitService } from 'src/app/services/submit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// Décorateur du composant
@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.css']
})
export class AuthorDashboardComponent implements OnInit {
  // Tableau pour stocker les soumissions
  submissions: any[] = [];
  // Colones à afficher dans le tableau des soumissions
  displayedColumns: string[] = ['title', 'abstractText', 'keywords', 'submissionStatus', 'submissionDate', 'submissionType'];

  // Constructeur avec les services et modules nécessaires
  constructor(private adminService: AdminService, private router: Router, private submitService: SubmitService, private snackBar: MatSnackBar) {
    // Écoute les événements de fin de navigation et appelle la méthode fetchSubmissions
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/author-dashboard') {
        this.fetchSubmissions();
      }
    });
  }
  // Nom de l'auteur
  authorName: string = '';

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit(): void {
    // Récupère l'ID de l'utilisateur depuis le localStorage
    const userId = parseInt(localStorage.getItem('userId'), 10);
    // Récupère les informations de l'auteur
    this.adminService.getAuthorInfo(userId).subscribe((data: any) => {
      this.authorName = data.firstName;
    });
    // Récupère les soumissions de l'auteur
    this.adminService.getAuthorSubmissions(userId).subscribe((data: any[]) => {
      console.log('Données de soumissions reçues:', data); // Affiche les données reçues
      this.submissions = data;
    });
  }
  // Génère l'URL du document soumis
 // Méthode pour générer l'URL du document soumis
getPaperUrl(subfolder: string, fileName: string): string {
  // Si aucun nom de fichier n'est fourni, retourne une chaîne vide
  if (!fileName) {
    console.log('Aucun nom de fichier fourni');
    return '';
  }

  // Normalise le nom du fichier en remplaçant les antislashs par des slashs
  const normalizedFileName = fileName.replace(/\\/g, '/');

  // Ajoute un slash à la fin du nom du sous-dossier
  const subfolderPrefix = subfolder + '/';

  // Nettoie le nom du fichier en supprimant le préfixe du sous-dossier s'il est présent
  const cleanedFileName = normalizedFileName.startsWith(subfolderPrefix) ? normalizedFileName.slice(subfolderPrefix.length) : normalizedFileName;

  // Construit l'URL complète en utilisant le sous-dossier et le nom de fichier nettoyé
  const url = `http://localhost:8080/api/submissions/${subfolder}/${cleanedFileName}`;

  // Affiche l'URL générée dans la console
  

  // Retourne l'URL générée
  return url;
}

  // Modifie la soumission sélectionnée
  modifySubmission(submissionId: number): void {
    this.router.navigate(['/modify-submission', submissionId]);
  }

  // Récupère les soumissions de l'auteur
  fetchSubmissions(): void {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    this.adminService.getAuthorInfo(userId).subscribe((data: any) => {
      this.authorName = data.firstName
    });
    this.adminService.getAuthorSubmissions(userId).subscribe((data: any[]) => {
      this.submissions = data;
    
     
    });
  }

  // Gère la sélection du fichier de paiement
  onPaymentFileSelected(event: any, submissionId: number): void {
  const paymentFile = event.target.files[0];
  // Envoie le fichier de paiement au serveur
this.submitService.uploadPaymentFile(paymentFile, submissionId).subscribe(response => {
 

  // Affiche la barre de notification de succès
  this.snackBar.open('Paiement téléchargé avec succès !', 'Fermer', {
    duration: 10000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['snackbar-success', 'custom-snackbar', 'mat-snack-bar-container-center']
  });

}, error => {
  console.log('Erreur lors du téléchargement du fichier de paiement:', error);

  // Affiche la barre de notification d'erreur
  this.snackBar.open("Une erreur s'est produite lors du téléchargement du fichier de paiement. Veuillez réessayer.", 'Fermer', {
    duration: 10000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['snackbar-error', 'custom-snackbar', 'mat-snack-bar-container-center']
  });
});
  }
  logout(): void {
    this.adminService.logout().subscribe(
      () => {
        this.router.navigate(['/admin']);
      },
      (error) => {
        console.error('Failed to logout', error);
      }
    );
  }
}
    