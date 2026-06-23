public class Main {
    public static void main(String[]args){
        DocumentFactory WordFactory = new WordFactory();
        Document WordDoc= WordFactory.createDocument();
        WordDoc.open();     
        
        DocumentFactory ExcelFactory=new ExcelFactory();
        Document ExcelDoc=ExcelFactory.createDocument();
        ExcelDoc.open();
        
        DocumentFactory PDFFactory=new PDFFactory();
        Document PDFDoc=PDFFactory.createDocument();
        PDFDoc.open();
        



    }
}
