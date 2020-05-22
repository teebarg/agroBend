class S3{
    constructor(Path, Body, Bucket = process.env.S3_BUCKET, ContentEncoding= 'base64', ContentType= 'image/jpeg') {
        this.Bucket = Bucket;
        this.Body = Body;
        this.Key = Path;
        this.ContentEncoding = ContentEncoding;
        this.ContentType = ContentType;
    }

}

module.exports = S3;