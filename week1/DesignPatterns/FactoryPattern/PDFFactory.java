
public class PDFFactory extends DocumentFactory{
       @Override
    public Document createDocument(){
        return new PDFDocument();
    }
}