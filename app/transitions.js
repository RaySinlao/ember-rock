export default function() {
  this.transition(
    this.fromRoute('bands.band.songs'),
    this.toRoute('bands.band.details'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
}
